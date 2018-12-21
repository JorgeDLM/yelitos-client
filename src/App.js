import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Operacion } from './components';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/operacion" component={Operacion} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
