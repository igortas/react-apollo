import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Auth from './components/auth/auth.component';
import Performers from './components/performers/performers.component';
import Categories from './components/categories/categories.component';

import './App.css';

/**
 * Refactoring this component to reuse some elements like forms
 * Refactoring the hooks, to have more universal useQuery and useMutation hook, more like wrapper one, for different kind of component data
 * As it's mentioned above, with more wrapper hooks, we can pass different components data into wrapper component with those hooks
 * Find the duplicate code through different components and create reusable one, like lists, tables etc..
 * For now there are root routes, edge cases is to have nested routes and to create routes per folder structure
 * Also for the routes it's best to have protected route which checks if the user is logged in
 * But in this task, there is not exists code for JWT tokens or something similar
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
