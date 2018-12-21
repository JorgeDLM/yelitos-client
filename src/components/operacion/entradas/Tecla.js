import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

const Tecla = props => (
  <Button
    onClick={() => props.agregarValor(props.valor)}
    size="lg"
    color={props.color || 'primary'}
    style={{ width: '100%', height: '5rem', fontSize: 40 }}
  >
    {props.valor}
  </Button>
);

Tecla.propTypes = {
  valor: PropTypes.number.isRequired,
  agregarValor: PropTypes.func.isRequired
};

export default Tecla;
