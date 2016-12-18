/**
 * Created by mhdevita on 12/15/16.
 */
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import './styles.scss'
const NotFoundComponent = () => (<div className="NotFoundComponent">
    <div className="container">
      <div className="col-xs-12 text-center well">
        <h4>404 Page Not Found</h4>
        <Link to="/app">Go back to the dashboard</Link>
      </div>
    </div>
</div>)
export default NotFoundComponent
