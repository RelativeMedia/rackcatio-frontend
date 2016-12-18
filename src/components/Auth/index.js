/**
 * Created by mhdevita on 12/14/2016.
 */
import React, { PropTypes } from 'react'
const { element } = PropTypes

import Login from './Login'
import Logout from './Logout'
import Authenticated from './Authenticated'

const AuthComponent = ({ children }) => (<div className="AuthComponent">
  {children}
</div>)

AuthComponent.propTypes = {
  children: element.isRequired
}

export {
  Login,
  Logout,
  Authenticated
}
export default AuthComponent
