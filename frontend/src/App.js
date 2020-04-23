import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Auth from './components/auth/auth.component';
import Performers from './components/performers/performers.component';
import Categories from './components/categories/categories.component';

import './App.css';

/**
 * The app component hold the root switch, for this task is enough
 * we don't need subroutes per feature, per folder, or some protected routes as we don't have full blown JWT implmenetation or something else
 * For unit test we can test the router for the valid paths 
 */
function App() {
  return (
    <div className='App'>
      <Switch>
        <Route path='/' component={Auth} exact />
        <Route path='/performers' component={Performers} />
        <Route path='/categories' component={Categories} />
      </Switch>
    </div>
  );
}

export default App;
