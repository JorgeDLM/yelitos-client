import React, { PureComponent } from 'react';
import { Card, Collapse } from 'reactstrap';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import toPairs from 'lodash/toPairs';
import { FaChevronUp, FaChevronDown, FaPlus } from 'react-icons/fa';
class ListadoMes extends PureComponent {
  state = {
    collapse: false,
    toggle: false,
    toggles: []
  };

  collapse() {
    this.setState({ collapse: !this.state.collapse });
  }
  toggle(fecha) {
    this.setState((state, props) => {
      if (state.toggles.includes(fecha)) {
        return {
          toggles: state.toggles.filter(f => f !== fecha)
        }
      } else {
        return {
          toggles: [...state.toggles, fecha]
        }
      }
    });
  }

  render() {
    var porFecha = groupBy(this.props.entradas, entrada =>
      moment(entrada.hora)
        .startOf('day')
        .format('DD/MM')
    );
    var porFechaPares = toPairs(porFecha);

    var porProducto = groupBy(
      this.props.entradas,
      entrada => `${entrada.producto.logotipo} ${entrada.producto.kgs}kgs`
    );
    var porProductoPares = toPairs(porProducto);
    porProductoPares = porProductoPares.map(par => {
      return [
        par[0],
        par[1].reduce((salida, entrada) => {
          salida += entrada.cantidad;
          return salida;
        }, 0),
        par[1].reduce((salida, entrada) => {
          salida += entrada.cantidad * entrada.producto.kgs;
          return salida;
        }, 0)
      ];
    });

    var ppc = porProductoPares.map((par, i) => {
          return (
            <tr key={`${par[0]}${par[1]}${i}`} className="fondoAzulClaro negro">
              <td>{par[0]}</td>
              <td colSpan={1}>{par[1]} bolsas</td>
              <td colSpan={3}>{par[2]} kgs</td>
            </tr>
          );
        })



    return (
      <React.Fragment>
        <tr onClick={this.collapse.bind(this)}>
          <td>{this.props.mes[0]}</td>
          <td>
            <Card className="pmuychico fondoAzulClaro negro centro">
              {this.props.mes[1]}/kgs
            </Card>
          </td>
          <td className="tchica">
            <div className="parmuychico">
              {this.state.collapse ? <FaChevronUp /> : <FaPlus />}
            </div>
          </td>
        </tr>
        {this.state.collapse && (
          <React.Fragment>
            <tr className="fondoAzulClaro negro wbold">
              <td colSpan={1}>Producto</td>
              <td colSpan={1}>Producción</td>
              <td colSpan={3}>En KG</td>
            </tr>

            {ppc}

            <tr className="fondoAzulClaro negro  mayus">
              <td className="wbold" colSpan={1}>
                Día
              </td>
              <td className="wbold" colSpan={3}>
                Producción
              </td>
              <td className="wbold" colSpan={1} />
            </tr>
            {porFechaPares.reverse().map((fecha, i) => (
              // en el segundo frag empieza el area colapsada
              <React.Fragment>
                <React.Fragment>
                  <tr
                    data-fecha={`${fecha[0]}`}
                    className="fondoAzulClaro negro"
                    onClick={() => this.toggle(fecha[0])}
                  >
                    <td colSpan={1}>{fecha[0]}</td>
                    <td colSpan={3}>
                      {(() => {
                        let valores = fecha[1].reduce(
                          (salida, entrada) => {
                            salida.cantidad += entrada.cantidad;
                            salida.kgs += this.props.getKgs(
                              entrada.cantidad,
                              entrada.productoId
                            );
                            return salida;
                          },
                          { cantidad: 0, kgs: 0 }
                        );
                        return (
                          <React.Fragment>
                            <Card className=" pchico centro negro">
                              {valores.kgs}/kgs
                            </Card>
                          </React.Fragment>
                        );
                      })()}
                    </td>
                    <td className="tchica " colSpan={1}>
                      <div className="parmuychico">
                        {this.state.toggles.includes(fecha[0]) ? <FaChevronUp /> : <FaPlus />}
                      </div>
                    </td>
                  </tr>
                  {this.state.toggles.includes(fecha[0]) && (
                    <React.Fragment>
                      {(() => {
                        let porProducto = groupBy(
                          fecha[1],
                          entrada => entrada.productoId
                        );
                        porProducto = map(
                          porProducto,
                          (entradas, productoId) => {
                            let tot = entradas.reduce((salida, entrada) => {
                                    salida += entrada.cantidad;
                                    return salida;
                                  }, 0)
                            return (
                              <tr className="fondoBlanco negro">
                                <td colSpan={1}>{`${
                                  entradas[0].producto.logotipo
                                } ${entradas[0].producto.kgs}kgs`}</td>
                                <td colSpan={1}>
                                  {tot}{' '}
                                  bolsas
                                </td>
                                <td colSpan={3} >{tot * entradas[0].producto.kgs} kgs</td>
                              </tr>
                            );
                          }
                        );
                        return porProducto;
                      })()}
                    </React.Fragment>
                  )}
                </React.Fragment>
              </React.Fragment>
            ))}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
export default ListadoMes;
