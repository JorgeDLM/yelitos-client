import React from 'react';
import { Container, Row, Col, Card, Button, Input, CardBody } from 'reactstrap';
import Tecla from './Tecla';
import { FaBackspace } from 'react-icons/fa';

export default props => (
  <Card>
    <CardBody>
      <Container>
        <Row>
          <Col>
            <Input
              value={props.cantidad}
              bsSize="lg"
              placeholder="Número de bolsas"
              className="tamanoInputCalculadora tenorme"
              readOnly
            />
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <Tecla agregarValor={props.cantidadModificar} valor={1}>
              1
            </Tecla>
          </Col>
          <Col>
            <Tecla agregarValor={props.cantidadModificar} valor={2}>
              2
            </Tecla>
          </Col>
          <Col>
            <Tecla agregarValor={props.cantidadModificar} valor={3}>
              3
            </Tecla>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <Tecla agregarValor={props.cantidadModificar} valor={4}>
              4
            </Tecla>
          </Col>
          <Col>
            <Tecla agregarValor={props.cantidadModificar} valor={5}>
              5
            </Tecla>
          </Col>
          <Col>
            <Tecla agregarValor={props.cantidadModificar} valor={6}>
              6
            </Tecla>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <Tecla agregarValor={props.cantidadModificar} valor={7}>
              7
            </Tecla>
          </Col>
          <Col>
            <Tecla agregarValor={props.cantidadModificar} valor={8}>
              8
            </Tecla>
          </Col>
          <Col>
            <Tecla agregarValor={props.cantidadModificar} valor={9}>
              9
            </Tecla>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <Button
              onClick={props.cantidadBorrar}
              style={{ width: '100%', fontSize: 40 }}
              size="lg"
              className="botonBlanco1"
            >
              <FaBackspace color="" />
            </Button>
          </Col>
          <Col>
            <Tecla agregarValor={props.cantidadModificar} valor={0} />
          </Col>
          <Col>
            <Button
              onClick={props.cantidadVaciar}
              style={{ width: '100%', fontSize: 40 }}
              size="lg"
              className="botonRojo"
            >
              Borrar
            </Button>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <Button
              onClick={props.cambiarComponente}
              style={{ width: '100%' }}
              size="lg"
              color="success"
              className="tenorme tamanoInputCalculadora"
              disabled={
                props.cantidad === '' ||
                parseInt(props.cantidad) * 1 === 0 ||
                isNaN(parseInt(props.cantidad) * 1)
              }
            >
              Continuar >>
            </Button>
          </Col>
        </Row>
      </Container>
    </CardBody>
  </Card>
);
