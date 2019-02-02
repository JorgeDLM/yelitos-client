import React from 'react';
import { Container, Row, Col, Card, Button, CardBody } from 'reactstrap';
import axios from 'axios';
import { axiosConfig } from '../../../constants';
import swal from '@sweetalert/with-react';

class ComponenteMaquinas extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      toggleActive: true
    };
    this.toggleActive = this.toggleActive.bind(this);
  }

  toggleActive() {
    this.setState({
      toggleActive: !this.state.toggleActive
    });
  }

  render() {
    return (
      <Col xs={4} className="pargrande">
        <Button
          className={
            this.state.toggleActive ? ' botonRojo pmayus' : ' botonVerde pmayus'
          }
          size="lg"
          onClick={this.toggleActive}
        >
          {this.props.maquina}
        </Button>
      </Col>
    );
  }
}

export default ComponenteMaquinas;
