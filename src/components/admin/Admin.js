import React from 'react';
import { TopLogo } from '../layouts';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import Productos from './productos/Productos';
import Insumos from './insumos/Insumos';
import Inicio from './inicio/Inicio';
import Produccion from './produccion/Produccion';
import './Admin.css';

class Admin extends React.PureComponent {
  rutas_admin = [
    {
      name: 'Inicio',
      path: '',
      component: Inicio,
      exact: true
    },
    {
      name: 'Productos',
      path: '/productos',
      component: Productos,
      exact: true
    },
    {
      name: 'Insumos',
      path: '/insumos',
      component: Insumos,
      exact: true
    },
    {
      name: 'Producción',
      path: '/produccion',
      component: Produccion,
      exact: true
    },
    {
      name: 'Operación',
      path: '/operacion',
      component: props => <Redirect to="/" />,
      exact: true
    }
  ];

  render() {
    return (
      <React.Fragment>
        <Menu>
          {this.rutas_admin.map((ruta, i) => (
            <div
              key={`ruta-${i}`}
              className="linkBlanco tmuygrande wbold parmuychico pabchico"
            >
              <NavLink
                key={ruta.name}
                to={`${this.props.match.url}${ruta.path}`}
              >
                {ruta.name}
              </NavLink>
            </div>
          ))}
        </Menu>
        <TopLogo className="tamanoProductoImg2">
          <Switch>
            {this.rutas_admin.map(ruta => (
              <Route
                key={ruta.name}
                path={`${this.props.match.url}${ruta.path}`}
                component={ruta.component}
                exact={ruta.exact}
              />
            ))}
          </Switch>
        </TopLogo>
      </React.Fragment>
    );
  }
}

export default Admin;
