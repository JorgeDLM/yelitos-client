import React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  CardBody,
  Alert,
  Table
} from 'reactstrap';
import axios from 'axios';
import { axiosConfig, SERVER_URL } from '../../../constants';
import swal from '@sweetalert/with-react';
import ComponenteMaquinas from './ComponenteMaquinas';
import ModalAgregarMaquina from './ModalAgregarMaquina';
import Chart from 'chart.js';
import { FaWindowClose, FaPlus, FaChevronUp } from 'react-icons/fa';
import ReactChartkick, { ColumnChart, LineChart } from 'react-chartkick';
import moment from 'moment';
import map from 'lodash/map';
import groupBy from 'lodash/groupBy';
import toPairs from 'lodash/toPairs';
import ListadoMes from './ListadoMes';

class Inicio extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      maquinas: [
        'agua',
        'osmosis',
        'Camara Fria',
        'Refri 1',
        'Refri 2',
        'Refri 3',
        'maquina 15T',
        'maquina 5T',
        'despachador de Hielo'
      ],
      insumos: [],
      productos: [],
      entradas: [],
      collapse: []
    };
    this.toggleCollapse = this.toggleCollapse.bind(this);
  }

  componentDidMount() {
    axios(axiosConfig('/insumos/minimos'))
      .then(response => {
        this.setState({ insumos: response.data.minimos });
      })
      .catch(console.log);
  }

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
    axios(axiosConfig(`/entradas`))
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

  getKgs(cantidad, id) {
    let producto = this.state.productos[id];
    if (producto) {
      return producto.kgs * cantidad;
    } else {
      return cantidad;
    }
  }

  formatSingle(entradas) {
    let entradasHoy = entradas.filter(entrada =>
      moment(entrada.hora).isAfter(moment().startOf('day'))
    );
    let grupos = groupBy(entradasHoy, entrada => {
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
    window.moment = moment;
    var final = [];
    for (var i = 0; i <= moment().hour() + 1; i++) {
      if (horasPresentes.includes(i)) {
        final[i] = mapa.shift();
      } else {
        final[i] = [`${i}:00`, 0];
      }
    }
    return final;
  }

  getGrafica() {
    return (
      <ColumnChart
        data={this.formatSingle(this.state.entradas)}
        messages={{ empty: 'No data' }}
      />
    );
  }

  toggleCollapse() {
    this.setState((state, props) => ({ collapse: !state.collapse }));
  }

  getListadosMes() {
    var entradasMes = groupBy(this.state.entradas, entrada => {
      let m = moment(entrada.hora);
      return `${m.format('MM')}/${m.year()}`;
    });

    entradasMes = toPairs(entradasMes);

    let entradasTotales = entradasMes.map(mes => [
      mes[0],
      mes[1].reduce((salida, entrada) => {
        salida += this.getKgs(entrada.cantidad, entrada.productoId);
        return salida;
      }, 0)
    ]);
    let entradasProductos = entradasMes.map(mes => {
      let entradas = mes[1].map(entrada => ({
        hora: entrada.hora,
        cantidad: entrada.cantidad,
        productoId: entrada.productoId,
        producto: this.state.productos[entrada.productoId]
      }));
      return entradas;
    });

    return entradasTotales.map((mes, i) => (
      <ListadoMes
        key={i}
        mes={mes}
        entradas={entradasProductos[i]}
        getKgs={this.getKgs.bind(this)}
      />
    ));
  }

  render() {
    return (
      <Container className="parchico">
        <Row>
          <Col>
            {this.state.insumos.map((insumo, i) => {
              if (insumo.cantidad < 0) {
                return (
                  <Alert color="danger">
                    Hay una discrepancia en el insumo {insumo.nombre} reportando{' '}
                    <span className="wbold">{insumo.cantidad}</span>
                  </Alert>
                );
              } else if (insumo.cantidad === 0) {
                return (
                  <Alert color="danger">
                    El insumo {insumo.nombre} se ha agotado
                  </Alert>
                );
              } else if (insumo.cantidad <= insumo.minimo) {
                return (
                  <Alert color="warning">
                    {' '}
                    El insumo {insumo.nombre} esta muy cercano a agotarse,{' '}
                    {insumo.cantidad} unidades restantes
                  </Alert>
                );
              } else if (insumo.cantidad <= insumo.minimo * 2) {
                return (
                  <Alert color="info">
                    El insumo {insumo.nombre} esta por agotarse,{' '}
                    {insumo.cantidad} unidades restantes
                  </Alert>
                );
              }
            })}
          </Col>
        </Row>
        <div className="centro wbold tgrande parmediano">
          Producción del día de hoy:
        </div>
        <Row className="mb-3">
          <Col>{this.getGrafica()}</Col>
        </Row>
        <Card className="fondoAzul blanco">
          <Table>
            <tbody>
              <tr>
                <th>MES</th>
                <th>PRODUCCION EN KG</th>
                <th>VER MÁS</th>
              </tr>
              {this.getListadosMes()}
            </tbody>
          </Table>
        </Card>

        <div className="parmediano">
          <ModalAgregarMaquina />
        </div>
        <div className="centro">Mapa</div>
        <Row className="pargrande centro ">
          {/*{this.state.maquinas.map((maquina, i) => (<ComponenteMaquinas key={i} maquina={maquina} />))}*/}
          <canvas id="mapa" width={500} height={500} />
        </Row>
      </Container>
    );
  }
}

export default Inicio;
