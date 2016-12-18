/**
 * Created by mhdevita on 12/14/16.
 */
import React from 'react'
import { Route, IndexRoute } from 'react-router'


import Auth, { Authenticated, Login, Logout } from './components/Auth'
import BaseLayout from './layouts/BaseLayout'
import CoreLayout from './layouts/CoreLayout'
import AuthLayout from './layouts/AuthLayout'

import Home from './components/Home'
import NotFound from './components/NotFound'
import { Dashboard, Subnet } from './components/App'


export default (<Route path="/" component={BaseLayout}>
    <IndexRoute component={Home} />
    <Route path="auth" component={AuthLayout}>
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
    </Route>

    <Route path="app" component={Authenticated(CoreLayout)}>
      <IndexRoute component={Dashboard} />
      <Route path="subnets">
        <IndexRoute  component={Subnet.List} />
        <Route path="detail/:id" component={Subnet.Detail} />
        <Route path="edit/:id" component={Subnet.Edit} />
        <Route path="delete/:id" component={Subnet.Delete} />
        <Route path="create" component={Subnet.Create}  />
      </Route>
      <Route path="profile">
        <IndexRoute />
        <Route path="profile/edit" />
      </Route>
    </Route>
    <Route path="*" component={NotFound} />
</Route>)
