/**
 * Created by mhdevita on 12/14/2016.
 */
import React, { PropTypes } from 'react'
import { Link } from 'react-router'


const HomeComponent = () => (<div>
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span className="sr-only">Toggle navigation</span>
          <i className="fa fa-bars"/>
        </button>
        <a className="navbar-brand" href="#"><img alt="Brand" src="/favicon.ico"/></a>
      </div>
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav">
          <li><Link to="/app">Dashboard</Link></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li><Link to="/auth/login">Login</Link></li>
        </ul>
      </div>
    </div>
  </nav>
  <div className="HomeComponent">

  </div>
</div>)

HomeComponent.propTypes = {

}

export default HomeComponent
