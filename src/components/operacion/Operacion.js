import React from 'react';
import Cantidad from './entradas/Cantidad';
import Presentaciones from './entradas/Presentaciones';
import _ from 'lodash/array';
// TODO: borrar mock data
import productos from './productos.mock.json';

class Operacion extends React.PureComponent {
  state = {
    cantidad: 0,
    presentacion: null,
    nombre: null,
    cadena_cantidad: '',
    vista: 1
  };

  handleCambioCantidad(valor) {
    this.setState(prevState => ({
      cadena_cantidad: `${prevState.cadena_cantidad}${valor}`
    }));
  }

  render() {
    switch (this.state.vista) {
      case 1:
        return (
          <Cantidad
            cantidad={this.state.cadena_cantidad}
            cantidadModificar={this.handleCambioCantidad.bind(this)}
            cantidadBorrar={() => {
              this.setState(prevState => ({
                cadena_cantidad: prevState.cadena_cantidad.substring(
                  0,
                  prevState.cadena_cantidad.length - 1
                )
              }));
            }}
            cantidadVaciar={() => {
              this.setState({ cadena_cantidad: '' });
            }}
            cambiarComponente={() => {
              this.setState({ vista: 2 });
            }}
          />
        );
      case 2:
        return <h1>Hello</h1>;
      case 3:
        break;
      default:
        this.setState({ vista: 1 });
        break;
    }
  }
}

export default Operacion;
