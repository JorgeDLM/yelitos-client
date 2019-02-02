import React from 'react';
import {
  Container,
  Button,
  Collapse,
  Input,
  InputGroup,
  InputGroupAddon
} from 'reactstrap';
import { FaAngleUp } from 'react-icons/fa';
import { axiosConfig } from '../../../../constants';
import axios from 'axios';
import swal from '@sweetalert/with-react';

class Admin extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      toggle2: false,
      insumos: [],
      insumo: '',
      cantidad: 0,
      kgs: 0,
      valid: true,
      logotipo: 'Yelitos'
    };

    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.submit = this.submit.bind(this);
    this.handleInsumos = this.handleInsumos.bind(this);
    this.handleInsumoChange = this.handleInsumoChange.bind(this);
    this.handleImage = this.handleImage.bind(this);
  }

  toggle() {
    this.setState({
      toggle: !this.state.toggle
    });
  }

  toggle2() {
    this.setState({
      toggle2: !this.state.toggle2
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

  changeInsumoCantidad(index, valor) {
    let insumos = this.state.insumos;
    insumos[index].cantidad = valor;
    this.setState({ insumos });
  }

  handleImage(e) {
    var canvas = document.getElementById('imageCanvas');
    var ctx = canvas.getContext('2d');
    var reader = new FileReader();
    reader.onload = function(event) {
      var img = new Image();
      img.onload = function() {
        let height = 80;
        let width = (img.width / img.height) * height;
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  render() {
    return (
      <Container>
        <div className="parchico pabchico">
          <Button className="botonAzul" onClick={this.toggle}>
            <div>
              <abbr className="tgrande">+ Añadir Producto</abbr>
            </div>
          </Button>
        </div>
        <Collapse isOpen={this.state.toggle}>
          <div>
            <InputGroup>
              <Input
                type="number"
                placeholder="Cantidad de hielo en KG"
                min={0}
                onChange={e => {
                  this.setState({ kgs: e.target.value });
                }}
                step={1}
              />
              <InputGroupAddon addonType="append">Kg</InputGroupAddon>
            </InputGroup>

            <InputGroup>
              <Input
                type="select"
                id="insumos"
                onChange={this.handleInsumoChange}
                defaultValue="#$5"
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
                onChange={e => {
                  this.setState({ cantidad: parseInt(e.target.value) });
                }}
                placeholder="Cantidad"
                id="cantidad"
                invalid={!this.state.valid && this.state.cantidad === 0}
              />
              <InputGroupAddon addonType="append">
                <Button className="botonAzulClaro" onClick={this.handleInsumos}>
                  +
                </Button>
              </InputGroupAddon>
            </InputGroup>

            {this.state.insumos.map((insumo, i) => {
              return (
                <InputGroup key={`IP-${i}`}>
                  <Input
                    type="text"
                    readOnly
                    value={insumo.insumo}
                    key={insumo.insumo}
                  />
                  <InputGroupAddon addonType="append">
                    <Input
                      type="number"
                      min="1"
                      defaultValue={insumo.cantidad}
                      onChange={e => {
                        this.changeInsumoCantidad(i, e.target.value);
                      }}
                    />
                  </InputGroupAddon>
                  <InputGroupAddon addonType="append">
                    <Button color="danger">-</Button>
                  </InputGroupAddon>
                </InputGroup>
              );
            })}
            <Input
              type="text"
              value={this.state.logotipo}
              placeholder="Logotipo en la Bolsa"
              onChange={e => {
                this.setState({ logotipo: e.target.value });
              }}
            />
            <Input
              type="file"
              placeholder="Logotipo"
              onChange={this.handleImage}
              accept="image/*"
            />
            <canvas id="imageCanvas" />
          </div>
          <div className="parchico pabmediano">
            <Button
              onClick={this.submit}
              className="botonAzulClaro claseBoton3 tmuygrande w100"
            >
              Añadir Producto
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

export default Admin;
