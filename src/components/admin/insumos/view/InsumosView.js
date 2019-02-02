import React from 'react';
import { Table, Button, Container, ButtonGroup } from 'reactstrap';
import { FaWindowClose, FaPen } from 'react-icons/fa';
import AñadirInsumo from './AñadirInsumo';
import AñadirInsumoInventario from './AñadirInsumoInventario';
import InsumoEdit from './InsumosEdit';

function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, '$1,$2');
  return x;
}

const Renglon = (insumo, indice, props) => {
  let precio = insumo.valor / insumo.cantidad;
  if (insumo.edit) {
    return (
      <InsumoEdit
        key={`insumos-edit-${insumo.id}`}
        cancel={props.edit}
        insumo={insumo}
        modify={props.modify}
      />
    );
  }
  return (
    <React.Fragment key={`insumos-list-${insumo.id}`}>
      <tbody>
        <tr>
          <td>{`${indice + 1}`}</td>
          <td>{insumo.nombre}</td>
          <td
            className={
              insumo.cantidad <= insumo.minimo
                ? 'wbold rojo'
                : insumo.cantidad <= insumo.minimo * 2
                ? 'wbold amarillo'
                : 'negro'
            }
          >
            {insumo.cantidad}
          </td>
          <td>${numberWithCommas(precio.toFixed(2))}</td>
          <td>${numberWithCommas(insumo.valor.toFixed(2))}</td>
          <td>
            <FaPen
              className="h4 amarillo iconoBoton"
              onClick={() => props.edit(insumo.id)}
            />{' '}
            <FaWindowClose
              className="h3 rojo iconoBoton"
              onClick={() => {
                props.borrar(insumo.id);
              }}
            />
          </td>
        </tr>
      </tbody>
    </React.Fragment>
  );
};

const Renglon2 = ({ insumos }) => {
  let valores = insumos.reduce(
    (salida, entrada) => {
      salida.cantidad += entrada.cantidad;
      salida.total += entrada.valor;
      return salida;
    },
    { cantidad: 0, total: 0 }
  );
  return (
    <tbody>
      <tr className="wbold">
        <td />
        <td className="fondoAzul blanco">CANTIDAD TOTAL:</td>
        <td className="fondoAzul blanco">{valores.cantidad}</td>
        <td className="fondoAzulClaro negro">VALOR TOTAL:</td>
        <td className="fondoAzulClaro negro">
          ${numberWithCommas(valores.total)}
        </td>
        <td />
      </tr>
    </tbody>
  );
};

export default props => (
  <Container>
    <AñadirInsumoInventario insumos={props.insumos} reload={props.reload} />
    <AñadirInsumo add={props.load} />
    <Table>
      <thead>
        <tr>
          <td className="wbold">#</td>
          <td className="wbold">Nombre</td>
          <td className="wbold">Cantidad</td>
          <td className="wbold">Valor x Unidad</td>
          <td className="wbold">Valor Total</td>
          <td />
        </tr>
      </thead>
      {props.insumos.map((insumo, i) => Renglon(insumo, i, props))}
      <Renglon2 {...props} />
    </Table>
  </Container>
);
