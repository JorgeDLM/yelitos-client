import React from 'react';
import { Container, Row, Col, Card, Button, Input, CardBody } from 'reactstrap';
import PropTypes from 'prop-types';

const Presentacion = props => (
  <Row>
    <Col>
      <Button />
    </Col>
  </Row>
);

const Presentaciones = props => (
  <Card>
    <Container />
  </Card>
);

Presentaciones.propTypes = {
  valor: PropTypes.number.isRequired,
  agregarValor: PropTypes.func.isRequired
};

export default Presentaciones;
