import React from 'react';
import InsumosView from './view/InsumosView';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import { axiosConfig } from '../../../constants';
// TODO delete mocks
import insumos from './insumos.mock.json';
import swal from '@sweetalert/with-react';

class Insumos extends React.PureComponent {
  state = {
    insumos: []
  };
  componentDidMount() {
    this.loadInsumos();
  }

  editInsumo(id) {
    let insumos = this.state.insumos;
    insumos = insumos.map(insumo => {
      if (insumo.id !== id) {
        return insumo;
      } else {
        if (insumo.edit) {
          delete insumo.edit;
        } else {
          insumo.edit = true;
        }
        return insumo;
      }
    });
    this.setState({ insumos });
  }

  loadInsumos() {
    axios(axiosConfig('/insumos'))
      .then(response => {
        this.setState({ insumos: response.data });
      })
      .catch(error => console.log);
  }

  addInsumo(insumo) {
    this.setState(prevState => ({
      insumos: [...prevState.insumos, insumo]
    }));
  }

  removeInsumo(id) {
    this.setState((state, props) => ({
      insumos: state.insumos.filter(insumo => insumo.id !== id)
    }));
  }

  deleteInsumo(id) {
    swal({
      title: 'Confirmar',
      text: '¿Desea borrar este insumo?',
      icon: 'warning',
      buttons: {
        confirm: {
          text: 'Aceptar',
          value: true
        },
        cancel: {
          text: 'Cancelar',
          value: false,
          visible: true
        }
      }
    }).then(confirm => {
      if (confirm) {
        axios(axiosConfig(`/insumos/${id}`, 'delete')).then(response => {
          this.removeInsumo(id);
          swal('Borrado', 'El insumo ha sido borrado exitosamente', 'success');
        });
      }
    });
  }
  modifyInsumo(id, insumo) {
    axios(axiosConfig(`/insumos/${id}`, 'patch', insumo)).then(response => {
      let insumos = this.state.insumos;
      insumos = insumos.map(insumo => {
        if (insumo.id === id) {
          return response.data;
        } else {
          return insumo;
        }
      });
      this.setState({ insumos });
    });
  }

  render() {
    return (
      <Container>
        <Row>
          <InsumosView
            insumos={this.state.insumos}
            reload={this.loadInsumos.bind(this)}
            load={this.addInsumo.bind(this)}
            edit={this.editInsumo.bind(this)}
            borrar={this.deleteInsumo.bind(this)}
            modify={this.modifyInsumo.bind(this)}
          />
        </Row>
      </Container>
    );
  }
}

export default Insumos;
