import React from 'react';
import Cantidad from './entradas/Cantidad';
import Presentaciones from './entradas/Presentaciones';
import Nombres from './entradas/Nombres';
import uniqBy from 'lodash/uniqBy';
import axios from 'axios';
import swal from '@sweetalert/with-react';
import { axiosConfig } from '../../constants';
import { TopLogo } from '../layouts';

class Operacion extends React.PureComponent {
  state = {
    productos: [],
    presentacion: null,
    cadena_cantidad: '',
    vista: 1
  };

  componentDidMount() {
    let filter = {
      where: {
        eliminado: false
      }
    };
    filter = JSON.stringify(filter);
    filter = window.encodeURI(filter);
    axios(axiosConfig(`/productos?filter=${filter}`))
      .then(response => this.setState({ productos: response.data }))
      .catch(error => console.log);
  }

  handleCambioCantidad(valor) {
    this.setState(prevState => ({
      cadena_cantidad: `${prevState.cadena_cantidad}${valor}`
    }));
  }

  handleCambioPresentacion(valor) {
    this.setState({ presentacion: valor, vista: 3 });
  }

  submit(valor) {
    const { id, kgs } = valor;
    let cantidad = parseInt(this.state.cadena_cantidad);
    if (!isNaN(cantidad)) {
      swal({
        title: 'Verifique su informacion',
        text: `Registar ${cantidad} bolsas en presentación de ${kgs} Kgs de bolsa ${
          valor.logotipo
        }`,
        icon: 'info',
        buttons: {
          confirm: {
            text: 'Continuar',
            value: true
          },
          cancel: {
            text: 'Cancelar',
            value: false,
            visible: true
          }
        }
      }).then(confirmacion => {
        console.log(confirmacion);
        if (confirmacion) {
          axios(
            axiosConfig('/entradas', 'post', {
              productoId: id,
              cantidad
            })
          )
            .then(response => {
              if (response.status === 200) {
                swal(
                  'Exito',
                  'La produccion ha sido regitrada',
                  'success'
                ).then(() => {
                  this.setState({
                    presentacion: null,
                    cadena_cantidad: '',
                    vista: 1
                  });
                });
              }
            })
            .catch(console.log);
        }
      });
    }
  }

  vistaActual() {
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
        return (
          <Presentaciones
            presentaciones={this.state.productos}
            presentacionModificar={this.submit.bind(this)}
            presentacionVolver={() => {
              this.setState({ vista: 1 });
            }}
          />
        );
      default:
        this.setState({ vista: 1 });
        break;
    }
  }

  render() {
    return <TopLogo>{this.vistaActual()}</TopLogo>;
  }
}

export default Operacion;
