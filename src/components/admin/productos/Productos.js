import React from 'react';
import ProductosView from './view/ProductosView';
import { Container, Row, Col } from 'reactstrap';
// TODO delete mocks
import productos from '../productos.mock.json';

class Productos extends React.PureComponent {
  render() {
    return (
      <Container>
        <Row>
          <ProductosView productos={productos} />
        </Row>
      </Container>
    );
  }
}

export default Productos;
