import React from 'react';
import { Table } from 'reactstrap';

const Renglon = (producto, indice) => (
  <tr>
    <td>{`${indice + 1}`}</td>
    <td contenteditable="true">{producto.nombre}</td>
    <td contenteditable="true">{producto.presentacion}</td>
    <td contenteditable="true">10</td>
  </tr>
);

export default props => (
  <Table className="table-editable">
    <thead>
      <th>#</th>
      <th>Nombre</th>
      <th>Presentaci&oacute;n</th>
      <th>Produccion de hoy</th>
    </thead>
    {props.productos.map(Renglon)}
  </Table>
);
