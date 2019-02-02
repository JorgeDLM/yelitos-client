import React, { PureComponent } from 'react';
import { Input, Button } from 'reactstrap';

class ProductoEdit extends PureComponent {
  state = {
    logotipo: '',
    kgs: 0
  };

  componentDidMount() {
    const { logotipo, kgs } = this.props.producto;
    this.setState({
      logotipo,
      kgs
    });
  }

  submit() {
    this.props.modify(this.props.producto.id, this.state);
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
          <td colSpan="2">
            <Input
              onChange={this.handleChange.bind(this)}
              value={this.state.logotipo}
              name="logotipo"
              type="text"
            />
          </td>
          <td>
            <Input
              onChange={this.handleChange.bind(this)}
              value={this.state.kgs}
              name="kgs"
              type="number"
            />
          </td>
        </tr>
        <tr>
          <td />

          <td />
          <td>
            <Button onClick={this.submit.bind(this)}>Guardar</Button>
          </td>
          <td>
            <Button
              color="danger"
              onClick={() => {
                this.props.cancel(this.props.producto.id);
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

export default ProductoEdit;
