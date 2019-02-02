import React, { PureComponent } from 'react';
import {
  Container,
  Row,
  Col,
  Table,
  Card,
  Tooltip,
  Collapse
} from 'reactstrap';
import ReactChartkick, { ColumnChart, LineChart } from 'react-chartkick';
import Chart from 'chart.js';
import axios from 'axios';
import { axiosConfig, SERVER_URL } from '../../../constants';
import {
  FaWindowClose,
  FaPlus,
  FaChevronUp,
  FaChevronDown
} from 'react-icons/fa';
import Calendario from '../calendario/Calendario';
import CalendarioSimple from '../calendario/CalendarioSimple';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import toPairs from 'lodash/toPairs';
import moment from 'moment';

moment.locale('es-MX');

class Produccion extends PureComponent {
  state = {
    productos: [],
    entradas: [],
    fechaInicio: null,
    fechafinal: null,
    fechaSimple: null,
    collapsed: [],
    isSingle: false
  };
  componentDidMount() {
    this.loadProductos();
    var urlToChangeStream = `${SERVER_URL}/api/entradas/change-stream?_format=event-stream`;
    var src = new EventSource(urlToChangeStream);
    src.addEventListener(
      'data',
      function(msg) {
        var data = JSON.parse(msg.data);
        console.log(data); // the change object
        this.setState((state, props) => ({
          entradas: [...state.entradas, data.data]
        }));
      }.bind(this)
    );
  }

  componentDidUpdate(prevProps, prevState) {
    let cambio =
      prevState.fechaInicio !== this.state.fechaInicio ||
      prevState.fechafinal !== this.state.fechafinal;
    let seleccion =
      this.state.fechaInicio !== null && this.state.fechafinal !== null;
    if (cambio && seleccion) {
      this.loadProductosDateRange();
      this.isSingle(false);
    }
  }

  dateOptionHora = {
    hour: 'numeric',
    minute: '2-digit'
  };

  dateOptionDia = {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  };

  loadProductos() {
    let filter = {
      where: {
        hora: {
          gt: moment()
            .startOf('day')
            .subtract(7, 'days')
            .toDate()
        }
      }
    };
    let encoded = window.encodeURI(JSON.stringify(filter));
    axios(axiosConfig(`/entradas?filter=${encoded}`))
      .then(response => {
        axios(axiosConfig('/productos'))
          .then(responsei => {
            this.setState({
              entradas: response.data,
              productos: responsei.data.reduce((salida, entrada) => {
                salida[entrada.id] = entrada;
                return salida;
              }, {})
            });
          })
          .catch(error => console.log);
      })
      .catch(error => console.log);
  }

  loadProductosDateRange() {
    let filter = {
      where: {
        and: [
          {
            hora: {
              gt: this.state.fechaInicio.startOf('day').toDate()
            }
          },
          {
            hora: {
              lt: this.state.fechafinal
                .startOf('day')
                .add(1, 'days')
                .toDate()
            }
          }
        ]
      }
    };
    let encoded = window.encodeURI(JSON.stringify(filter));
    axios(axiosConfig(`/entradas?filter=${encoded}`))
      .then(response => {
        this.setState({ entradas: response.data });
      })
      .catch(error => console.log);
  }

  loadProductosSingleDate(fecha) {
    let filter = {
      where: {
        and: [
          {
            hora: {
              gt: fecha.startOf('day').toDate()
            }
          },
          {
            hora: {
              lt: fecha.endOf('day').toDate()
            }
          }
        ]
      }
    };
    let encoded = window.encodeURI(JSON.stringify(filter));
    axios(axiosConfig(`/entradas?filter=${encoded}`))
      .then(response => {
        this.setState({ entradas: response.data });
      })
      .catch(error => console.log);
  }

  formatProducto(id) {
    let producto = this.state.productos[id];
    if (producto) {
      return `${producto.logotipo} ${producto.kgs}kgs`;
    } else {
      return 'Producto eliminado';
    }
  }

  formatTotal(cantidad, id) {
    let producto = this.state.productos[id];
    if (producto) {
      return `${producto.kgs * cantidad}kgs`;
    } else {
      return `${cantidad} unidades`;
    }
  }

  getKgs(cantidad, id) {
    let producto = this.state.productos[id];
    if (producto) {
      return producto.kgs * cantidad;
    } else {
      return cantidad;
    }
  }

  toggleCollapse(fecha) {
    if (this.state.collapsed.includes(fecha)) {
      this.setState((state, props) => ({
        collapsed: state.collapsed.filter(collapsed => collapsed !== fecha)
      }));
    } else {
      this.setState((state, props) => ({
        collapsed: [...state.collapsed, fecha]
      }));
    }
  }

  isSingle(isSingle) {
    this.setState({ isSingle });
  }

  formatDays(entradas) {
    let dias = groupBy(entradas, entrada =>
      moment(entrada.hora).startOf('day')
    );

    let delta =
      (moment(this.state.fechafinal) - moment(this.state.fechaInicio)) /
      60000 /
      60 /
      24;
    if (delta <= 7) {
      let formatted = map(dias, (groups, day) => {
        return {
          name: `${moment(day).format('MMM DD')}`,
          data: this.formatSingle(groups)
        };
      });
      return <LineChart data={formatted} />;
    } else {
      var diasPresentes = [];
      let formatted = map(dias, (groups, day) => {
        diasPresentes.push(moment(day).startOf('day'));
        return [
          `${moment(day).format('MMM DD')}`,
          groups.reduce((salida, entrada) => {
            return (salida += this.getKgs(
              entrada.cantidad,
              entrada.productoId
            ));
          }, 0)
        ];
      });

      console.log(diasPresentes);
      var final = [];
      for (var i = 0; i <= delta; i++) {
        if (
          diasPresentes.some(presente =>
            presente.isSame(
              moment(this.state.fechaInicio)
                .add(i, 'days')
                .startOf('day')
            )
          )
        ) {
          final[i] = formatted.shift();
        } else {
          final[i] = [
            moment(this.state.fechaInicio)
              .add(i, 'days')
              .format('MMM DD'),
            0
          ];
        }
      }

      return <ColumnChart data={final} />;
    }
  }

  formatSingle(entradas) {
    let grupos = groupBy(entradas, entrada => {
      return moment(entrada.hora).hour();
    });
    var horasPresentes = [];
    let mapa = map(grupos, (groups, hour) => {
      horasPresentes.push(parseInt(hour));
      return [
        `${hour}:00`,
        groups.reduce((i, o) => i + this.getKgs(o.cantidad, o.productoId), 0)
      ];
    });
    //console.log(horasPresentes);
    //console.log(mapa);
    var final = [];
    for (var i = 0; i <= 24; i++) {
      if (horasPresentes.includes(i)) {
        final[i] = mapa.shift();
      } else {
        final[i] = [`${i}:00`, 0];
      }
    }
    return final;
  }

  getTotales() {
    var porProducto = groupBy(
      this.state.entradas,
      entrada =>
        `${this.state.productos[entrada.productoId].logotipo} ${
          this.state.productos[entrada.productoId].kgs
        }kgs`
    );
    var porProductoPares = toPairs(porProducto);
    porProductoPares = porProductoPares.map(par => {
      return [
        par[0],
        par[1].reduce((salida, entrada) => {
          salida += entrada.cantidad;
          return salida;
        }, 0)
      ];
    });
    var res = null;
    var ppc = [];
    while (porProductoPares.length > 1) {
      let uno = porProductoPares.shift();
      let dos = porProductoPares.shift();
      ppc.push(
        <Row className="">
          <Col>{uno[0]}</Col>
          <Col>{uno[1]}</Col>
          <Col colSpan={2}>{dos[0]}</Col>
          <Col>{dos[1]}</Col>
        </Row>
      );
    }

    if (porProductoPares.length === 1) {
      let ultimo = porProductoPares.shift();
      ppc.push(
        <Row className="">
          <Col>{ultimo[0]}</Col>
          <Col>{ultimo[1]}</Col>
          <Col colSpan={2}>-</Col>
          <Col>-</Col>
        </Row>
      );
    }

    return ppc;
  }

  getGrafica() {
    if (this.state.isSingle) {
      return <ColumnChart data={this.formatSingle(this.state.entradas)} />;
    } else if (
      this.state.fechaInicio === null &&
      this.state.fechafinal === null
    ) {
      let dias = groupBy(this.state.entradas, entrada => {
        return moment(entrada.hora).date();
      });
      let formatted = map(dias, (groups, day) => {
        return {
          name: `${moment().format('MMM')} ${day}`,
          data: this.formatSingle(groups)
        };
      });
      return (
        <React.Fragment>
          <h3 className="centro mt-3">Mostrando los últimos siete dias</h3>
          <LineChart data={formatted} />
        </React.Fragment>
      );
    } else {
      return this.formatDays(this.state.entradas);
    }
  }

  render() {
    let agrupados = groupBy(this.state.entradas, entrada => {
      return moment(entrada.hora)
        .startOf('day')
        .format();
    });
    var porFecha = map(
      agrupados,
      function(group, day) {
        return {
          day: day,
          times: group,
          open: !this.state.collapsed.includes(day)
        };
      }.bind(this)
    );
    return (
      <Container className="parmediano">
        <Row>
          <Col className="wbold tgrande ">Delimita rango:</Col>
          <Col>
            <Calendario
              rango="true"
              getDates={(fechaInicio, fechafinal) =>
                this.setState({ fechaInicio, fechafinal })
              }
            />
          </Col>
        </Row>
        <Row className="parmediano">
          <Col className="wbold tgrande ">Selecciona fecha:</Col>
          <Col>
            <CalendarioSimple
              atras="true"
              getDates={fechaSimple => {
                this.loadProductosSingleDate(fechaSimple);
                this.setState({ fechaSimple });
                this.isSingle(true);
              }}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>{this.getGrafica()}</Col>
        </Row>
        <div className="parchico">
          <Card className="pmediano">
            <div className="wbold tgrande">Ventas del periodo:</div>
            <hr />
            <Row className="wbold">
              <Col>Producto</Col>
              <Col>Cantidad</Col>
              <Col>Producto</Col>
              <Col>Cantidad</Col>
            </Row>
            {this.getTotales()}
          </Card>
        </div>
        <Row
          className="parmediano
        "
        >
          <Col>
            {porFecha.reverse().map(fecha => {
              return (
                <React.Fragment key={`from-${fecha.day}`}>
                  <div className="parmediano pabchico">
                    <Card className="parmediano pdemediano pizmediano">
                      <Row
                        className="pabchico wbold"
                        onClick={() => {
                          this.toggleCollapse(fecha.day);
                        }}
                      >
                        <Col xs={6}>
                          {new Date(fecha.day).toLocaleString(
                            'es-MX',
                            this.dateOptionDia
                          )}
                        </Col>
                        <Col xs={4}>
                          {(() => {
                            let valores = fecha.times.reduce(
                              (salida, entrada) => {
                                salida.cantidad += entrada.cantidad;
                                salida.kgs += this.getKgs(
                                  entrada.cantidad,
                                  entrada.productoId
                                );
                                return salida;
                              },
                              { cantidad: 0, kgs: 0 }
                            );
                            return (
                              <React.Fragment>
                                <Card className="fondoAzulClaro pchico centro">
                                  {valores.kgs}/kgs
                                </Card>
                              </React.Fragment>
                            );
                          })()}
                        </Col>
                        <Col className="izquierda">
                          {fecha.open ? <FaChevronUp /> : <FaChevronDown />}
                        </Col>
                      </Row>
                      <Collapse isOpen={fecha.open}>
                        <Table>
                          <thead>
                            <tr>
                              <td className="wbold">#</td>
                              <td className="wbold">Hora</td>
                              <td className="wbold">Producto</td>
                              <td className="wbold">Producción</td>
                              <td className="wbold">Total KGS</td>
                            </tr>
                          </thead>
                          <tbody className="fondoAzulClaro">
                            {fecha.times.map((entrada, i) => {
                              return (
                                <tr key={entrada.id}>
                                  <td>{`${i + 1}`}</td>
                                  <td>
                                    {new Date(entrada.hora).toLocaleString(
                                      'es-MX',
                                      this.dateOptionHora
                                    )}
                                  </td>
                                  <td>
                                    {this.formatProducto(entrada.productoId)}
                                  </td>
                                  <td>{entrada.cantidad}</td>
                                  <td>
                                    {this.formatTotal(
                                      entrada.cantidad,
                                      entrada.productoId
                                    )}
                                  </td>
                                  {/*<td>
                                {<FaWindowClose className="rojo iconoBoton" />}
                              </td>*/}
                                </tr>
                              );
                            })}
                          </tbody>
                          <tbody className="fondoAzul blanco">
                            <tr>
                              <td />
                              <td className="wbold">PRODUCCIÓN</td>
                              <td className="wbold">TOTAL:</td>
                              {(() => {
                                let valores = fecha.times.reduce(
                                  (salida, entrada) => {
                                    salida.cantidad += entrada.cantidad;
                                    salida.kgs += this.getKgs(
                                      entrada.cantidad,
                                      entrada.productoId
                                    );
                                    return salida;
                                  },
                                  { cantidad: 0, kgs: 0 }
                                );
                                return (
                                  <React.Fragment>
                                    <td>{valores.cantidad}</td>
                                    <td>{valores.kgs}/kgs</td>
                                  </React.Fragment>
                                );
                              })()}

                              {/*<td>
                                {<FaWindowClose className="rojo iconoBoton" />}
                              </td>*/}
                            </tr>
                          </tbody>
                        </Table>
                      </Collapse>
                    </Card>
                  </div>
                </React.Fragment>
              );
            })}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Produccion;
