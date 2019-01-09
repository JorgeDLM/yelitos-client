import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import logo from '../../imgs/Logo.jpg';

export default props => (
  <Container fluid className="ml-lg-5 pl-md-5">
    <Row>
      <Col className="centro">
        <img
          src={logo}
          alt="Logo"
          className={props.className || 'tamanoProductoImg3'}
        />
      </Col>
    </Row>
    <Row>
      <Col>{props.children}</Col>
    </Row>
  </Container>
);
