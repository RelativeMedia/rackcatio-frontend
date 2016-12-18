/**
 * Created by mhdevita on 12/14/2016.
 */
import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { NavDropdown, MenuItem, NavItem } from 'react-bootstrap'
import { Link } from 'react-router'

const { object } = PropTypes
import './styles.scss'
class Navigation extends Component {
  static contextTypes = {
    router: object.isRequired
  }

  static propTypes = {
    app: object.isRequired,
    auth: object.isRequired,
    notification: object.isRequired
  }

  render () {
    const { app, auth, notification } = this.props
    const username = (auth.user) ? auth.user.username : ''

    return (<nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                  data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <i className="fa fa-bars"/>
          </button>
          <a className="navbar-brand" href="#"><img alt="Brand" src="/favicon.ico"/>Rackcat.io</a>
        </div>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right">
            <NavDropdown title={ username } id="profile-dropdown">
              <MenuItem to='/app/profile'>View Your Profile</MenuItem>
              <MenuItem to="/app/profile/edit">Edit Your Profile</MenuItem>
              <MenuItem divider />
              <MenuItem to="/app/password/change"><i className="fa fa-key" /> Change Password</MenuItem>
            </NavDropdown>
            <MenuItem to="/auth/logout"><i className="fa fa-sign-out" /> Logout</MenuItem>
          </ul>
          {(notification && notification.length > 0) &&
            <ul className="nav navbar-nav navbar-right">
              <NavDropdown title={(<i className="fa fa-exclamation-triangle"/>)} id="notifications-dropdown">
                <div className="notificationsContainer">
                </div>
              </NavDropdown>
            </ul>
          }
          <ul className="nav navbar-nav navbar-right">
            <MenuItem to="/app/admin/users">Users</MenuItem>
            <MenuItem to="/app/admin/groups">Groups</MenuItem>
          </ul>
        </div>
      </div>
    </nav>)
  }
}
const mapStateToProps = (state) => ({
  app: state.app,
  auth: state.auth,
  notification: state.notification
})
export default connect(mapStateToProps)(Navigation)
