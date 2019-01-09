import React from 'react';
import { Container, Row, Col, Card, Button, ButtonGroup } from 'reactstrap';
import PropTypes from 'prop-types';
import './entradas.css';

const Presentacion = props => (
  <Row className="mt-2">
    <Col>
      <ButtonGroup
        className="w100"
        onClick={() => {
          props.cambio(props.presentacion);
        }}
      >
        <Button className="botonAzulClaro botonPresentacion mt-2">
          {props.presentacion.presentacion}
        </Button>
        <Button className="botonAzul botonPresentacion mt-2">
          {props.presentacion.nombre}
        </Button>
      </ButtonGroup>
    </Col>
  </Row>
);

const Presentaciones = props => (
  <Card className="pabgrande">
    <Container>
      <Row>
        <Col xs={2} className="pargrande">
          <Button
            onClick={props.presentacionVolver}
            className="botonAmarillo"
            size="lg"
          >
            Volver
          </Button>
        </Col>
        <Col>
          <div className="mt-2 parmediano">
            <span className="tmuygrande gris">
              Seleccione la presentaci&oacute;n:
            </span>
          </div>
        </Col>
      </Row>
      {props.presentaciones.map(presentacion => (
        <Presentacion
          key={presentacion.id}
          presentacion={presentacion}
          cambio={props.presentacionModificar}
        />
      ))}
    </Container>
  </Card>
);

Presentaciones.propTypes = {
  presentaciones: PropTypes.array.isRequired
};

export default Presentaciones;
