import React from 'react';
import {
  Container,
  Button,
  Collapse,
  Input,
  InputGroup,
  InputGroupAddon
} from 'reactstrap';
import axios from 'axios';
import { axiosConfig } from '../../../../constants';
import { FaAngleUp } from 'react-icons/fa';
import swal from '@sweetalert/with-react';

class AñadirInsumos extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      nombre: '',
      cantidad: 0,
      valor: 0,
      minimo: 0
    };

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }
  toggle() {
    this.setState({
      toggle: !this.state.toggle
    });
  }

  handleChange(e) {
    let state = {};
    const { name, value, type } = e.target;
    state[name] = type === 'text' ? value : parseFloat(value);
    this.setState(state);
  }

  submit() {
    const { nombre, cantidad, valor, minimo } = this.state;
    axios(
      axiosConfig('/insumos', 'post', {
        nombre,
        cantidad,
        valor,
        minimo
      })
    ).then(response => {
      swal('Exito', 'El insumo ha sido añadido', 'success');
      this.props.add(response.data);
    });
  }

  render() {
    return (
      <Container>
        <div className="parchico pabchico">
          <Button className="botonAzul" onClick={this.toggle}>
            <div>
              <abbr className="tgrande">+ Añadir Insumo Nuevo</abbr>
            </div>
          </Button>
        </div>
        <Collapse isOpen={this.state.toggle}>
          <div>
            <Input
              type="text"
              onChange={this.handleChange}
              placeholder="Nombre"
              name="nombre"
            />
            <InputGroup>
              <Input
                type="number"
                onChange={this.handleChange}
                placeholder="Cantidad"
                min={0}
                step={1}
                name="cantidad"
              />
            </InputGroup>
            <InputGroup>
              <Input
                type="number"
                onChange={this.handleChange}
                placeholder="Valor Total"
                min={0}
                step={1}
                name="valor"
              />
              <InputGroupAddon addonType="append">$</InputGroupAddon>
            </InputGroup>
            <InputGroup>
              <Input
                type="number"
                onChange={this.handleChange}
                placeholder="Inventario Mínimo"
                min={0}
                step={1}
                name="minimo"
              />
            </InputGroup>
          </div>

          <div className="parchico pabmediano">
            <Button
              onClick={this.submit}
              className="botonAzulClaro claseBoton3 tmuygrande w100"
            >
              Añadir Insumo
            </Button>
          </div>
          <div onClick={this.toggle}>
            <Button className="claseBoton3 botonAzul w100">
              <FaAngleUp />
            </Button>
          </div>
        </Collapse>
      </Container>
    );
  }
}

export default AñadirInsumos;
