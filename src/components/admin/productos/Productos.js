import React from 'react';
import ProductosView from './view/ProductosView';
import { Container, Row, Col, Collapse, Card } from 'reactstrap';
import axios from 'axios';
import { axiosConfig } from '../../../constants';
import swal from '@sweetalert/with-react';
import {
  FaWindowClose,
  FaPlus,
  FaChevronUp,
  FaChevronDown
} from 'react-icons/fa';

class Productos extends React.PureComponent {
  state = {
    productos: [],
    insumos: [],
    collapse: false
  };
  componentDidMount() {
    this.loadProductos();
  }

  toggleCollapse() {
    this.setState((state, props) => ({ collapse: !state.collapse }));
  }

  loadProductos() {
    axios(axiosConfig('/productos'))
      .then(response => {
        this.setState({
          productos: response.data.map(producto => {
            producto.edit = false;
            return producto;
          })
        });
      })
      .catch(error => console.log);
    axios(axiosConfig('/insumos'))
      .then(response => {
        this.setState({ insumos: response.data });
      })
      .catch(error => console.log);
  }

  addProducto(producto) {
    this.setState(prevState => ({
      productos: [...prevState.productos, producto]
    }));
  }

  editProducto(id) {
    console.log('som');
    let productos = this.state.productos.map(producto => {
      if (producto.id === id) {
        producto.edit = !producto.edit;
      }
      return producto;
    });
    this.setState({ productos });
  }

  reloadProducto(producto) {
    this.setState((state, props) => ({
      productos: state.productos.map(state_producto => {
        if (state_producto.id === producto.id) {
          console.log('Si');
          producto.edit = false;
          return producto;
        } else {
          console.log('No');
          return state_producto;
        }
      })
    }));
  }

  removeInsumo(productoId, insumoId, insumos) {
    swal({
      text: '¿Desea borrar el insumo?',
      icon: 'warning',
      buttons: {
        confirm: { text: 'Confirmar', value: true },
        cancel: { text: 'Cancelar', value: false, visible: true }
      }
    }).then(confirmar => {
      if (confirmar) {
        axios(
          axiosConfig(`/productos/${productoId}`, 'patch', {
            insumos: insumos.filter(insumo => insumo.id !== insumoId)
          })
        )
          .then(response => {
            this.reloadProducto(response.data);
          })
          .catch(console.log);
      }
    });
  }

  removeProducto(id) {
    this.setState((state, props) => ({
      productos: state.productos.filter(producto => producto.id !== id)
    }));
  }

  deleteProducto(id) {
    swal({
      title: 'Confirmar',
      text: '¿Desea borrar este producto?',
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
        axios(
          axiosConfig(`/productos/${id}`, 'patch', { eliminado: true })
        ).then(response => {
          this.reloadProducto(response.data);
          swal(
            'Borrado',
            'El producto ha sido borrado exitosamente',
            'success'
          );
        });
      }
    });
  }
  restaurarProducto(id) {
    swal({
      title: 'Confirmar',
      text: '¿Desea restaurar este producto?',
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
        axios(
          axiosConfig(`/productos/${id}`, 'patch', { eliminado: false })
        ).then(response => {
          this.reloadProducto(response.data);
          swal(
            'Restaurado',
            'El producto ha sido restaurado exitosamente',
            'success'
          );
        });
      }
    });
  }

  modifyProducto(id, productoInfo) {
    axios(axiosConfig(`/productos/${id}`, 'patch', productoInfo)).then(
      response => {
        let data = response.data;
        data.edit = false;
        this.reloadProducto(data);
      }
    );
  }

  render() {
    return (
      <Container>
        <Row>
          <ProductosView
            productos={this.state.productos.filter(
              producto => !producto.eliminado
            )}
            insumos={this.state.insumos}
            modify={this.modifyProducto.bind(this)}
            edit={this.editProducto.bind(this)}
            load={this.addProducto.bind(this)}
            reload={this.reloadProducto.bind(this)}
            borrar={this.deleteProducto.bind(this)}
            borrarInsumo={this.removeInsumo.bind(this)}
          />
        </Row>
        <Row>
          <Col>
            <Card className="pchico" onClick={this.toggleCollapse.bind(this)}>
              <Row>
                <Col xs={8}>
                  <h4>Productos Eliminados</h4>
                </Col>
                <Col className="derecha parmuychico pdegrande">
                  {this.state.collapse ? <FaChevronUp /> : <FaChevronDown />}
                </Col>
              </Row>
            </Card>
            <Collapse isOpen={this.state.collapse}>
              <ProductosView
                eliminados={true}
                productos={this.state.productos.filter(
                  producto => producto.eliminado
                )}
                insumos={this.state.insumos}
                load={this.addProducto.bind(this)}
                reload={this.reloadProducto.bind(this)}
                agregar={this.restaurarProducto.bind(this)}
              />
            </Collapse>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Productos;
