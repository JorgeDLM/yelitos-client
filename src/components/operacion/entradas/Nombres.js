import React from 'react';
import { Container, Row, Col, Card, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import './entradas.css';

const Nombre = props => (
  <Row className="mt-2">
    <Col>
      <Button
        onClick={() => {
          props.cambio(props.nombre);
        }}
        className="botonPresentacion botonAzul mt-2"
      >
        {props.nombre.nombre}
      </Button>
    </Col>
  </Row>
);

const Nombres = props => (
  <Card className="pabgrande">
    <Container>
      <Row>
        <Col xs={2} className="pargrande">
          <Button
            onClick={props.nombreVolver}
            className="botonAmarillo"
            size="lg"
          >
            Volver
          </Button>
        </Col>
        <Col>
          <div className="mt-2 parmediano">
            <span className="tmuygrande gris">Seleccione tipo de bolsa:</span>
          </div>
        </Col>
      </Row>
      {props.nombres.map(nombre => (
        <Nombre
          key={nombre.nombre}
          nombre={nombre}
          cambio={props.nombreModificar}
        />
      ))}
    </Container>
  </Card>
);

Nombres.propTypes = {
  nombres: PropTypes.array.isRequired
};

export default Nombres;
