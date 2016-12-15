/**
 * Created by mhdevita on 12/14/16.
 */
import React from 'react';
import { Route, IndexRoute } from 'react-router';


import Auth, { Authenticated, Login, Logout } from './components/Auth'
import CoreLayout from './layouts/CoreLayout';
import Home from './components/Home';
import App from './containers/AppContainer';
import AppHome from './components/App';
// import NotFoundPage from './components/NotFoundPage.js';

export default (
  <Route path="/" component={CoreLayout}>
    <IndexRoute component={Home} />
    <Route path="auth" component={Auth}>
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
    </Route>
    <Route path="app" component={Authenticated(App)}>
      <IndexRoute component={AppHome} />
    </Route>
  </Route>
);
