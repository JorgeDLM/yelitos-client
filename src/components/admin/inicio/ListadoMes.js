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
    toggle: false
  };

  collapse() {
    this.setState({ collapse: !this.state.collapse });
  }
  toggle() {
    this.setState({ toggle: !this.state.toggle });
  }

  render() {
    var porFecha = groupBy(this.props.entradas, entrada =>
      moment(entrada.hora)
        .startOf('day')
        .format('DD/MM')
    );
    var porFechaPares = toPairs(porFecha);

    var porProducto = groupBy(this.props.entradas, entrada => `${entrada.producto.logotipo} ${entrada.producto.kgs}kgs`)
    var porProductoPares = toPairs(porProducto)
    porProductoPares = porProductoPares.map(par => {
      return [par[0], par[1].reduce((salida, entrada) => {
        salida += entrada.cantidad
        return salida
      }, 0) ]
    })
    var res = null;
    var ppc = []
    while(porProductoPares.length > 1) {
      let uno = porProductoPares.shift()
      let dos = porProductoPares.shift()
      ppc.push((
        <tr className='fondoAzulClaro negro'>
          <td>{uno[0]}</td>
          <td>{uno[1]}</td>
          <td colSpan={2}>{dos[0]}</td>
          <td>{dos[1]}</td>
        </tr>))
    }

    if(porProductoPares.length === 1){
      let ultimo = porProductoPares.shift()
      ppc.push((<tr className='fondoAzulClaro negro'>
        <td>{ultimo[0]}</td>
        <td>{ultimo[1]}</td>
        <td colSpan={2}>-</td>
        <td>-</td>
      </tr>))
    }
    
    console.log(ppc)
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
              {this.state.toggle ? <FaChevronUp /> : <FaPlus />}
            </div>
          </td>
        </tr>
        {this.state.collapse && (
          <React.Fragment>
            
          <tr className='fondoAzulClaro negro wbold'>
            <td>Producto</td>
            <td>produccion</td>
            <td colSpan={2}>Producto</td>
            <td>produccion</td>
          </tr>
          {ppc}

            <tr className="fondoAzulClaro negro  mayus">
              <td className="wbold" colSpan={2}>Día</td>
              <td className="wbold" colSpan={2}>Producción</td>
              <td className="wbold" colSpan={2}/>
            </tr>
            {porFechaPares.map((fecha, i) => (
              // en el segundo frag empieza el area colapsada
              <React.Fragment>
                <React.Fragment>
                  <tr
                    className="fondoAzulClaro negro"
                    onClick={this.toggle.bind(this)}
                  >
                    <td colSpan={2}>{fecha[0]}</td>
                    <td >
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
                    <td className="tchica " colSpan={2}>
                      <div className="parmuychico">
                        {this.state.toggle ? <FaChevronUp /> : <FaPlus />}
                      </div>
                    </td>
                  </tr>
                  {this.state.toggle && (
                    <React.Fragment>
                      {(() => {
                        let porProducto = groupBy(
                          fecha[1],
                          entrada => entrada.productoId
                        );
                        porProducto = map(
                          porProducto,
                          (entradas, productoId) => {
                            return (
                              <tr>
                                <td   colSpan={2}/>
                                <td  colSpan={2}>{entradas[0].producto.logotipo}</td>
                                <td  colSpan={2}>
                                  {entradas.reduce((salida, entrada) => {
                                    salida += entrada.cantidad;
                                    return salida;
                                  }, 0)}{' '}
                                  bolsas
                                </td>
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
