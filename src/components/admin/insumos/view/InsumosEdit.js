import React, { PureComponent } from 'react';
import { Input, Button } from 'reactstrap';

class InsumoEdit extends PureComponent {
  state = {
    nombre: '',
    cantidad: 0,
    minimo: 0,
    valor: 0
  };

  componentDidMount() {
    const { nombre, cantidad, valor, minimo } = this.props.insumo;
    this.setState({
      nombre,
      cantidad,
      valor,
      minimo
    });
  }

  submit() {
    this.props.modify(this.props.insumo.id, this.state);
  }

  handleChange(e) {
    const { name, value, type } = e.target;
    let state = {};
    state[name] = type === 'number' ? parseFloat(value) : value;
    this.setState(state);
  }

  render() {
    return (
      <tbody>
        <tr>
          <td />
          <td>
            <Input
              onChange={this.handleChange.bind(this)}
              value={this.state.nombre}
              name="nombre"
              type="text"
            />
          </td>
          <td>
            <Input
              onChange={this.handleChange.bind(this)}
              value={this.state.cantidad}
              name="cantidad"
              type="number"
            />
          </td>
          <td>
            <Input
              value={this.state.valor / this.state.cantidad || 0}
              readOnly
              type="number"
            />
          </td>
          <td>
            <Input
              onChange={this.handleChange.bind(this)}
              value={this.state.valor}
              name="valor"
              type="number"
            />
          </td>
        </tr>
        <tr>
          <td />
          <td className="wbold">Mínimo</td>
          <td>
            <Input
              onChange={this.handleChange.bind(this)}
              value={this.state.minimo}
              name="minimo"
              type="number"
            />
          </td>
          <td />
          <td>
            <Button onClick={this.submit.bind(this)}>Guardar</Button>
          </td>
          <td>
            <Button
              color="danger"
              onClick={() => {
                this.props.cancel(this.props.insumo.id);
              }}
            >
              Cancelar
            </Button>
          </td>
        </tr>
      </tbody>
    );
  }
}

export default InsumoEdit;
