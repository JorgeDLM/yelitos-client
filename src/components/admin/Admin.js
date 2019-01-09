import React from 'react';
import { TopLogo } from '../layouts';
import { Switch, Route, NavLink } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import Productos from './productos/Productos';
import './Admin.css';

class Admin extends React.PureComponent {
  rutas_admin = [
    {
      name: 'Inicio',
      path: '',
      component: props => <h1>Inicio</h1>,
      exact: true
    },
    {
      name: 'Productos',
      path: '/productos',
      component: Productos,
      exact: true
    },
    {
      name: 'Entradas',
      path: '/entradas',
      component: props => <h1>Entradas</h1>,
      exact: true
    }
  ];

  render() {
    return (
      <React.Fragment>
        <Menu>
          {this.rutas_admin.map(ruta => (
            <div className="linkBlanco tmuygrande wbold parmuychico pabchico">
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
