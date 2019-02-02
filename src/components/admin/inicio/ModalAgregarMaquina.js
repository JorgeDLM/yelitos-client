import React from 'react';
import {
  Container,
  Button,
  Collapse,
  Input,
  InputGroup,
  InputGroupAddon,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import { FaWindowClose, FaPlus } from 'react-icons/fa';
import { axiosConfig } from '../../../constants';
import axios from 'axios';
import swal from '@sweetalert/with-react';

class ModalAgregarMaquina extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      insumos: [],
      insumo: '',
      cantidad: 0,
      kgs: 0
    };

    this.modal = this.modal.bind(this);
    this.handleInsumoChange = this.handleInsumoChange.bind(this);
    this.submit = this.submit.bind(this);
    this.handleInsumos = this.handleInsumos.bind(this);
  }

  componentDidMount() {
    this.loadProductos();
  }

  modal() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleInsumoChange(e) {
    this.setState({ insumo: e.target.value });
  }

  insumos = this.props.insumos;

  handleInsumos(e) {
    e.preventDefault();
    let insumos = document.getElementById('insumos');
    let insumo_cantidad = document.getElementById('cantidad');
    let id = insumos.selectedOptions[0].dataset.id;
    if (insumo_cantidad.value == 0) {
      this.setState({ valid: false });
      return;
    }
    if (insumos.value !== '#$5') {
      insumos.selectedIndex = '0';
      insumo_cantidad.value = '';
      this.setState({
        insumos: [
          ...this.state.insumos,
          {
            insumo: this.state.insumo,
            cantidad: this.state.cantidad,
            id
          }
        ],
        insumo: '',
        valid: true,
        cantidad: 0
      });
    }
  }

  loadProductos() {
    axios(axiosConfig('/productos'))
      .then(response => {
        this.setState({ productos: response.data });
      })
      .catch(error => console.log);
    axios(axiosConfig('/insumos'))
      .then(response => {
        this.setState({ insumos: response.data });
      })
      .catch(error => console.log);
  }

  submit() {
    var canvas = document.getElementById('imageCanvas');
    let { kgs, insumos, logotipo, nombre } = this.state;
    let element = document.createElement('canvas');
    let blank = element.toDataURL();
    let logotipo_imagen = canvas.toDataURL();

    if (this.state.insumo !== '' && this.state.kgs !== 0) {
      let insumo = document.getElementById('insumos');
      insumos.push({
        insumo: this.state.insumo,
        cantidad: this.state.cantidad,
        id: insumo.selectedOptions[0].dataset.id
      });
    }

    let data = {
      kgs,
      insumos,
      logotipo,
      nombre
    };

    if (logotipo_imagen !== blank) {
      data['logotipo_imagen'] = logotipo_imagen;
    }

    axios(axiosConfig('/productos', 'post', data))
      .then(response => {
        swal('Exito', 'El producto ha sido añadido', 'success');
        this.props.add(response.data);
      })
      .catch(error => console.log);
  }

  render() {
    return (
      <React.Fragment>
        <Button onClick={this.modal} className="botonAzul">
          Agregar Maquina +{' '}
        </Button>
        <Modal isOpen={this.state.modal} modal={this.modal}>
          {' '}
          <ModalHeader className="fondoAzul blanco wbold">
            Agregar Maquina
          </ModalHeader>{' '}
          <ModalBody className="fondoAzulClaro">
            nombre, id del switch en yelitos
          </ModalBody>{' '}
          <ModalFooter>
            <Button className="claseBoton3 botonAzul">Agregar</Button>
            <Button className="claseBoton3 botonRojo" onClick={this.modal}>
              Cancelar
            </Button>
          </ModalFooter>{' '}
        </Modal>
      </React.Fragment>
    );
  }
}

export default ModalAgregarMaquina;
