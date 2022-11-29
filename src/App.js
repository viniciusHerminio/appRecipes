import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={ () => <Login /> }
      />
      <Route path="/meals" render={ () => <Recipes type="meals" /> } />
      <Route path="/drinks" render={ () => <Recipes type="drinks" /> } />
    </Switch>
  );
}

export default App;
