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

class ModalAgregarInsumos extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      insumo: '',
      cantidad: 0,
      insumoId: ''
    };

    this.modal = this.modal.bind(this);
    this.submit = this.submit.bind(this);
    this.handleInsumos = this.handleInsumos.bind(this);
  }

  modal() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleInsumos(e) {
    const { name, value, type } = e.target;
    let state = {};
    state[name] = type === 'number' ? parseFloat(value) : value;
    if (name === 'insumo') {
      state['insumoId'] = e.target.selectedOptions[0].dataset.id;
    }
    this.setState(state);
  }

  submit() {
    let { insumo, insumoId, cantidad } = this.state;

    let producto = this.props.producto;

    producto.insumos.push({ insumo, cantidad, id: insumoId });
    console.log(producto);
    axios(axiosConfig(`/productos/${this.props.producto.id}`, 'put', producto))
      .then(response => {
        this.modal();
        swal('Exito', 'El producto ha sido añadido', 'success');
        this.props.reload(response.data);
      })
      .catch(error => console.log);
  }

  render() {
    return (
      <React.Fragment>
        <Button onClick={this.modal} className="botonAzul claseBoton3">
          +{' '}
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.modal}>
          {' '}
          <ModalHeader className="fondoAzul blanco wbold">
            Agregar Insumo a{' '}
            {`${this.props.producto.logotipo} ${this.props.producto.kgs}/kg`}
          </ModalHeader>{' '}
          <ModalBody className="fondoAzulClaro">
            <InputGroup>
              <Input
                type="select"
                id={`insumos-${this.props.producto.id}`}
                onChange={this.handleInsumos}
                defaultValue="#$5"
                name="insumo"
              >
                <option value="#$5" hidden>
                  Seleccionar Insumos
                </option>
                {this.props.insumos.map((insumo, i) => (
                  <option
                    key={`insumo-${i}`}
                    value={insumo.insumo}
                    data-id={insumo.id}
                  >
                    {insumo.nombre}
                  </option>
                ))}
              </Input>
              <Input
                type="number"
                min="0"
                step="1"
                name="cantidad"
                onChange={this.handleInsumos}
                placeholder="Cantidad"
                id={`cantidad-${this.props.producto.id}`}
                invalid={!this.state.valid && this.state.cantidad === 0}
              />
            </InputGroup>
          </ModalBody>{' '}
          <ModalFooter>
            <Button
              className="claseBoton3 botonAzulClaro"
              onClick={this.submit}
            >
              Agregar
            </Button>
            <Button className="claseBoton3 botonRojo" onClick={this.modal}>
              Cancelar
            </Button>
          </ModalFooter>{' '}
        </Modal>
      </React.Fragment>
    );
  }
}

export default ModalAgregarInsumos;
