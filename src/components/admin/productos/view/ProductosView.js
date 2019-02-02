import React from 'react';
import { Table, Button, Container, Row, Col } from 'reactstrap';
import { FaWindowClose, FaPlus, FaChevronUp, FaPen } from 'react-icons/fa';
import AñadirProducto from './AñadirProducto';
import ProductoEdit from './ProductoEdit';
import ModalAgregarInsumos from '../ModalAgregarInsumos';

const Renglon = (producto, indice, props) => {
  console.log(producto.edit);
  if (producto.edit === true) {
    return (
      <ProductoEdit
        key={`productos-edit-${producto.id}`}
        cancel={props.edit}
        producto={producto}
        modify={props.modify}
      />
    );
  }
  return (
    <React.Fragment key={indice}>
      <tbody>
        <tr>
          <td>{`${indice + 1}`}</td>
          <td>{producto.logotipo}</td>
          <td>{producto.kgs}</td>
          <td>
            <Button
              className="botonAzul claseBoton3"
              onClick={() => {
                let show = document.querySelectorAll(`#tr${producto.id}`);
                show.forEach(element => {
                  element.classList.toggle('d-none');
                });
              }}
              id={`c${producto.id}`}
              data-target="group-of-rows-1"
            >
              Ver Insumos
            </Button>
          </td>
          <td>
            <FaPen
              className="h4 amarillo iconoBoton"
              onClick={() => props.edit(producto.id)}
            />{' '}
            {props.eliminados !== true && (
              <FaWindowClose
                className="h3 rojo iconoBoton"
                onClick={() => {
                  props.borrar(producto.id);
                }}
              />
            )}
            {props.eliminados === true && (
              <FaPlus
                className="h3 azul iconoBoton"
                onClick={() => {
                  props.agregar(producto.id);
                }}
              />
            )}
          </td>
        </tr>
      </tbody>
      <thead id={`tr${producto.id}`} className="d-none fondoAzulClaro">
        <tr>
          <td />
          <td>
            <b>Insumo</b>
          </td>
          <td>
            <b>Cantidad</b>
          </td>
          <td>
            <b>Borrar</b>
          </td>
        </tr>
      </thead>
      <tbody id={`tr${producto.id}`} className="d-none fondoAzulClaro">
        {producto.insumos.map((insumo, i) => (
          <tr key={`inner-insumo-${i}`}>
            <td />
            <td>{insumo.insumo}</td>
            <td>{insumo.cantidad}</td>
            <td>
              <FaWindowClose
                className="rojo iconoBoton"
                onClick={() =>
                  props.borrarInsumo(producto.id, insumo.id, producto.insumos)
                }
              />
            </td>
          </tr>
        ))}
      </tbody>
      <tbody id={`tr${producto.id}`} className="d-none fondoAzulClaro">
        <tr>
          <td />
          <td />
          <td>
            <ModalAgregarInsumos
              producto={producto}
              insumos={props.insumos}
              reload={props.reload}
            />
          </td>
          <td />
        </tr>
      </tbody>
      <tbody id={`tr${producto.id}`} className="d-none centro">
        <tr>
          <td />
          <td />
          <td>
            <Button
              className="botonBlanco1"
              onClick={() => {
                let show = document.querySelectorAll(`#tr${producto.id}`);
                show.forEach(element => {
                  element.classList.toggle('d-none');
                });
              }}
            >
              <FaChevronUp />
            </Button>
          </td>
        </tr>
      </tbody>
    </React.Fragment>
  );
};

export default props => (
  <Container>
    {props.eliminados !== true && (
      <AñadirProducto add={props.load} insumos={props.insumos} />
    )}
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Bolsa</th>
          <th>Kg</th>
          <th>Insumos</th>
          <th />
        </tr>
      </thead>
      {props.productos.map((producto, i) => Renglon(producto, i, props))}
    </Table>
  </Container>
);
