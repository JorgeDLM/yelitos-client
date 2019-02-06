import React from 'react';
import {
  Container,
  Row,
  Col,
  Table,
  Collapse,
  Label,
  Button
} from 'reactstrap';
import axios from 'axios';
import { axiosConfig } from '../../../constants';
// TODO delete mocks
import swal from '@sweetalert/with-react';
import {
  FaPlus,
  FaChevronUp,
  FaPen,
  FaWindowClose,
  FaEdit
} from 'react-icons/fa';
import Calendario from '../calendario/Calendario';

class Ventas extends React.PureComponent {
  state = {
    inventario: false,
    clientes: false,
    areacliente: false,
    ventas: true,
    ventasArea: false,
    cxc: true,
    pagos: true,
    pagos2: true,
    adeudo: true
  };

  inventario() {
    this.setState({ inventario: !this.state.inventario });
  }
  clientes() {
    this.setState({ clientes: !this.state.clientes });
  }
  areacliente() {
    this.setState({ areacliente: !this.state.areacliente });
  }
  ventas() {
    this.setState({ ventas: !this.state.ventas });
  }
  ventasArea() {
    this.setState({ ventasArea: !this.state.ventasArea });
  }

  cxc() {
    this.setState({ cxc: !this.state.cxc });
  }
  adeudo() {
    this.setState({ adeudo: !this.state.adeudo });
  }
  pagos() {
    this.setState({ pagos: !this.state.pagos });
  }
  pagos2() {
    this.setState({ pagos2: !this.state.pagos2 });
  }

  render() {
    return (
      <Container>
        <Row
          className="wbold tgrande parmuygrande"
          onClick={this.ventas.bind(this)}
        >
          <Col xs={5}>Ventas </Col>
          <Col className="izquierda">
            {!this.state.ventas ? (
              <FaPlus className="tchica" />
            ) : (
              <FaChevronUp className="tchica" />
            )}
          </Col>
        </Row>
        <Collapse isOpen={this.state.ventas}>
          <div className="centro">
            <Button className="w100 botonAzul mayus">
              <FaEdit /> Registrar Venta
            </Button>
          </div>
        </Collapse>
        <Collapse
          isOpen={this.state.ventas}
          className="fondoGrisClaro pchico pabmediano"
        >
          <div className="wbold parchico">Ventas del día (Clientes):</div>
          <Row className="wbold azul">
            <Col>Cliente</Col>
            <Col className="sinpymiz">Volumen</Col>
            <Col className="sinpymiz">
              <Label className="d-none d-sm-inline">Compra</Label> Total
            </Col>
          </Row>
          <Row>
            <Col>Super Rola</Col>
            <Col className="sinpymiz">255/kg</Col>
            <Col className="sinpymiz">$2,158.88</Col>
          </Row>
          <Row>
            <Col>Fiesta</Col>
            <Col className="sinpymiz">2500/kg</Col>
            <Col className="sinpymiz">$18,158.88</Col>
          </Row>
          <hr />
          <div className="wbold">Ventas del día (Productos):</div>
          <Row className="wbold azul">
            <Col>Producto</Col>
            <Col className="sinpymiz">Unidades</Col>
            <Col className="d-none d-sm-block sinpymiz">Volumen</Col>
            <Col className="sinpymiz">
              <Label className="d-none d-sm-inline">Compra</Label> Total
            </Col>
          </Row>
          <Row>
            <Col>PractiBolsa 5k</Col>
            <Col className="sinpymiz">55</Col>
            <Col className="d-none d-sm-block sinpymiz">255/kg</Col>
            <Col className="sinpymiz">$2,158.88</Col>
          </Row>
          <Row>
            <Col>Yelitos 5k</Col>
            <Col className="sinpymiz">500</Col>
            <Col className="d-none d-sm-block sinpymiz">2500/kg</Col>
            <Col className="sinpymiz">$18,158.88</Col>
          </Row>
          <hr />
          <Calendario
            rango="true"
            getDates={(fechaInicio, fechafinal) =>
              this.setState({ fechaInicio, fechafinal })
            }
          />
          <div className={this.state.ventasArea && 'fondoAzulClaro'}>
            <Row className="wbold" onClick={this.ventasArea.bind(this)}>
              <Col xs={10} sm={7} md={6}>
                <div>
                  Ventas del mes{' '}
                  {this.state.ventasArea && <Label>(Clientes)</Label>}:
                </div>
              </Col>
              <Col className="sinpymiz">
                <FaPlus className="tchica" />
              </Col>
            </Row>
            <Collapse isOpen={this.state.ventasArea}>
              <Row className="wbold azul">
                <Col>Cliente</Col>
                <Col className="sinpymiz">Volumen</Col>
                <Col className="sinpymiz">
                  <Label className="d-none d-sm-inline">Compra</Label> Total
                </Col>
              </Row>
              <Row>
                <Col>Super Rola</Col>
                <Col className="sinpymiz">255/kg</Col>
                <Col className="sinpymiz">$2,158.88</Col>
              </Row>
              <Row>
                <Col>Fiesta</Col>
                <Col className="sinpymiz">2500/kg</Col>
                <Col className="sinpymiz">$18,158.88</Col>
              </Row>
              <hr />
              <div className="wbold">Ventas del mes (Productos):</div>
              <Row className="wbold azul">
                <Col>Producto</Col>
                <Col className="sinpymiz">Unidades</Col>
                <Col className="d-none d-sm-block sinpymiz">Volumen</Col>
                <Col className="sinpymiz">
                  <Label className="d-none d-sm-inline">Compra</Label> Total
                </Col>
              </Row>
              <Row>
                <Col>PractiBolsa 5k</Col>
                <Col className="sinpymiz">55</Col>
                <Col className="d-none d-sm-block sinpymiz">255/kg</Col>
                <Col className="sinpymiz">$2,158.88</Col>
              </Row>
              <Row>
                <Col>Yelitos 5k</Col>
                <Col className="sinpymiz">500</Col>
                <Col className="d-none d-sm-block sinpymiz">2500/kg</Col>
                <Col className="sinpymiz">$18,158.88</Col>
              </Row>
            </Collapse>
            {/*Añadir venta, graficas, calendario, ventas del dia, ventas del mes*/}
          </div>
        </Collapse>
        <hr />
        <Row className="wbold tgrande " onClick={this.inventario.bind(this)}>
          <Col xs={5}>Inventario </Col>
          <Col className="izquierda">
            {!this.state.inventario ? (
              <FaPlus className="tchica" />
            ) : (
              <FaChevronUp className="tchica" />
            )}
          </Col>
        </Row>
        <Collapse isOpen={this.state.inventario}>
          <Table className="fondoAzulClaro">
            <tr>
              <th>Productos</th>
              <th>Cantidad</th>
              <th>Valor</th>
              <th>
                <Label className="d-none d-sm-block">Editar</Label>
              </th>
            </tr>
            <tr>
              <td>Fiesta 5k</td>
              <td>
                255/<Label className="d-none d-sm-inline">bolsas</Label>{' '}
                <Label className="d-inline d-sm-none">pz</Label>
              </td>
              <td>$485.50</td>
              <td>
                <FaPen className="amarillo tchica" />
              </td>
            </tr>
            <tr>
              <td>Yelitos 5k</td>
              <td>
                151/<Label className="d-none d-sm-inline">bolsas</Label>{' '}
                <Label className="d-inline d-sm-none">pz</Label>
              </td>
              <td>$185.50</td>
              <td>
                <FaPen className="amarillo tchica" />
              </td>
            </tr>
          </Table>
        </Collapse>
        {/*
        en el editar solo se deben de poder editar la cantidad de bolsas en
        almacen, se deben de guardar registros de almacen y luego cuando haya
        usuario que se identifiquen con cada uno*/}
        <hr />
        <Row className="wbold tgrande" onClick={this.clientes.bind(this)}>
          <Col xs={5}>Clientes </Col>
          <Col className="izquierda">
            {!this.state.clientes ? (
              <FaPlus className="tchica" />
            ) : (
              <FaChevronUp className="tchica" />
            )}
          </Col>
        </Row>
        <Collapse isOpen={this.state.clientes}>
          <Table className="fondoAzul blanco">
            <tr>
              <th>
                <Label className="d-none d-sm-inline">Nombre del </Label>Cliente
              </th>
              <th>
                <Label className="d-none d-sm-inline">Ver</Label> Productos
              </th>
              <th>Editar</th>
            </tr>
            <tr>
              <td onClick={this.areacliente.bind(this)}>Fiesta</td>
              <td onClick={this.areacliente.bind(this)}>
                {!this.state.areacliente ? (
                  <FaPlus className="tchica" />
                ) : (
                  <FaChevronUp className="tchica" />
                )}
              </td>
              <td>
                <FaPen className="negro tchica" />{' '}
                <FaWindowClose className="rojo" />
              </td>
            </tr>
            {this.state.areacliente && (
              <React.Fragment>
                <tr className="fondoAzulClaro negro">
                  <th>Producto</th>
                  <th>Precio</th>
                  <th />
                </tr>
                <tr className="fondoAzulClaro negro">
                  <td>Fiesta 5k</td>
                  <td>$4.15</td>
                  <td>
                    <FaPen className="negro tchica" />{' '}
                    <FaWindowClose className="rojo" />
                  </td>
                </tr>
                <tr className="fondoAzulClaro negro">
                  <td>Fiesta 15k</td>
                  <td>$12.00</td>
                  <td>
                    <FaPen className="negro tchica" />{' '}
                    <FaWindowClose className="rojo" />
                  </td>
                </tr>
                <tr className="fondoAzulClaro negro">
                  <td>Frappe 5k</td>
                  <td>$6.50</td>
                  <td>
                    <FaPen className="negro tchica" />{' '}
                    <FaWindowClose className="rojo" />
                  </td>
                </tr>
                <tr className="centro fondoAzulClaro">
                  <td colSpan={3} className="negro wbold">
                    <Button className="botonAzul">
                      <FaPlus /> Añadir Producto
                    </Button>
                  </td>
                </tr>
              </React.Fragment>
            )}
            {!this.state.areacliente && (
              <tr>
                <td colSpan={3} className="centro fondoAzul blanco">
                  <Button className="botonBlanco1">
                    <FaPlus /> Añadir Cliente
                  </Button>
                </td>
              </tr>
            )}
          </Table>
        </Collapse>
        <hr />
        <Row className="wbold tgrande" onClick={this.cxc.bind(this)}>
          <Col xs={5}>Cuentas por cobrar </Col>
          <Col className="izquierda">
            {!this.state.cxc ? (
              <FaPlus className="tchica" />
            ) : (
              <FaChevronUp className="tchica" />
            )}
          </Col>
        </Row>

        <Collapse isOpen={this.state.cxc} className="fondoAzulClaro">
          <Button className="botonAzul w100">
            <FaPlus className="tchica" /> Agregar Abono
          </Button>
        </Collapse>
        <Collapse isOpen={this.state.cxc} className="fondoAzulClaro">
          <Table>
            <tr className="pchico">
              <th>Cliente</th>
              <th>Adeudo</th>
              <th />
            </tr>
            <tr className="pchico" onClick={this.adeudo.bind(this)}>
              <td>Juan Gabriel</td>
              <td>$127,000.00</td>
              <td>
                <FaPlus className="tchica" />
              </td>
            </tr>
            {this.state.adeudo && (
              <React.Fragment>
                <tr className="pchico">
                  <th>Fecha</th>
                  <th>Tipo</th>
                  <th>Monto</th>
                  <th>Total</th>
                  <th />
                </tr>
                <tr className="pchico" onClick={this.pagos2.bind(this)}>
                  <td>15 enero 2019</td>
                  <td>Compras</td>
                  <td className="rojo">$15,000</td>
                  <td>$127,000.00</td>
                  <td>
                    {!this.state.pagos2 ? (
                      <FaPlus className="tchica" />
                    ) : (
                      <FaChevronUp className="tchica" />
                    )}
                  </td>
                </tr>
                {this.state.pagos2 && (
                  <React.Fragment>
                    <tr className="fondoGrisClaro">
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th colSpan={3}>Monto</th>
                    </tr>
                    <tr className="fondoGrisClaro">
                      <td>Yelitos 5k</td>
                      <td>225 pza</td>
                      <td colSpan={3}>$1,598.00</td>
                    </tr>
                    <tr className="fondoGrisClaro">
                      <td>Yelitos 15k</td>
                      <td>11 pza</td>
                      <td colSpan={3}>$128.00</td>
                    </tr>
                  </React.Fragment>
                )}

                <tr onClick={this.pagos.bind(this)}>
                  <td>15 enero 2019</td>
                  <td>Abono</td>
                  <td className="azul">$25,000.00</td>
                  <td>$102,000.00</td>
                  <td>
                    {!this.state.pagos ? (
                      <FaPlus className="tchica" />
                    ) : (
                      <FaChevronUp className="tchica" />
                    )}
                  </td>
                </tr>
                {this.state.pagos && (
                  <React.Fragment>
                    <tr className="fondoGrisClaro">
                      <th colSpan={2}>Tipo de Pago</th>
                      <th colSpan={3}>Comentarios:</th>
                    </tr>
                    <tr className="fondoGrisClaro">
                      <td colSpan={2}>Efectivo</td>
                      <td colSpan={3}>n/a</td>
                    </tr>
                  </React.Fragment>
                )}
              </React.Fragment>
            )}
          </Table>
        </Collapse>
      </Container>
    );
  }
}

export default Ventas;
