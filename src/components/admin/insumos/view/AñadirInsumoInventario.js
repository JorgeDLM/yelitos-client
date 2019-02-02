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

class AñadirInsumoInventario extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      cantidad: 0,
      valor: 0,
      insumo: '',
      insumos: []
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

    if (type !== 'select-one') {
      state[name] = type === 'text' ? value : parseFloat(value);
    } else {
      state[name] = e.target.selectedOptions[0].value;
    }
    this.setState(state);
  }

  submit() {
    const { cantidad, valor, insumo } = this.state;
    let checkCantidad = cantidad > 0,
      checkValor = valor > 0,
      checkInsumo = insumo !== '';
    console.log('Submit: ', insumo);
    if (checkInsumo && checkValor && checkCantidad) {
      axios(
        axiosConfig('/entradasinsumos', 'post', {
          cantidad,
          valor,
          insumoId: insumo
        })
      ).then(response => {
        swal(
          'Exito',
          'El Inventario del insumo ha sido actualizado',
          'success'
        ).then(() => {
          this.props.reload();
        });
      });
    } else {
      swal(
        'Informacion faltante',
        'Por favor asegurese de llenar todos los campos',
        'error'
      );
    }
  }

  render() {
    return (
      <Container>
        <div className="parchico pabchico">
          <Button className="botonAzulClaro" onClick={this.toggle}>
            <div>
              <abbr className="tgrande">Ingresar Inventario</abbr>
            </div>
          </Button>
          <Collapse isOpen={this.state.toggle}>
            <div>
              <Input
                type="select"
                onChange={this.handleChange}
                placeholder="Insumo"
                name="insumo"
              >
                <option value="$5ñ" hidden>
                  Seleccionar:
                </option>
                {this.props.insumos.map(insumo => (
                  <option key={`opt-${insumo.id}`} value={insumo.id}>
                    {insumo.nombre}
                  </option>
                ))}
              </Input>
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
                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                <Input
                  type="number"
                  onChange={this.handleChange}
                  placeholder="Valor Total"
                  min={0}
                  step={1}
                  name="valor"
                />
              </InputGroup>
            </div>
            <div className="parchico pabmediano">
              <Button
                onClick={this.submit}
                className="botonAzul claseBoton3 tmuygrande w100"
              >
                Ingresar
              </Button>
            </div>
            <div onClick={this.toggle}>
              <Button className="claseBoton3 botonAzulClaro w100">
                <FaAngleUp />
              </Button>
            </div>
          </Collapse>
        </div>
      </Container>
    );
  }
}

export default AñadirInsumoInventario;
