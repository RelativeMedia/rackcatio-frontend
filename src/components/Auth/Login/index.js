/**
 * Created by mhdevita on 12/14/2016.
 */
import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { actions as Auth } from '../../../reducers/auth'

const { object } = PropTypes

class LoginComponent extends Component {
  static contextTypes = {
    store: object.isRequired,
    router: object.isRequired
  }
  static propTypes = {
  }

  constructor  (props) {
    super(props)

    this.state = {
      isSubmitting: false,
      formInvalid: true,
      identity: null,
      identityValid: false,
      password: null,
      passwordValid: false
    }
  }

  _handleIdentityUpdate = (event) => {
    event.preventDefault()
    this.setState({
      identity: this.refs.identity.value,
      identityValid: (this.refs.identity.value.length > 0) ? true : false,
      formInvalid: (this.refs.identity.value.length > 0 && this.state.passwordValid) ? false : true
    })
  }

  _handlePasswordUpdate = (event) => {
    event.preventDefault()
    this.setState({
      password: this.refs.password.value,
      passwordValid: (this.refs.password.value.length > 0) ? true : false,
      formInvalid: (this.refs.password.value.length > 0 && this.state.identityValid) ? false : true
    })
  }

  _handleLogin = (event) => {
    event.preventDefault()
    this.setState({
      isSubmitting: true
    })

    const { dispatch } = this.context.store
    const { identity, password } = this.state
    dispatch(Auth.login({ identity, password }))
  }
  render ()  {
    return (<div className="LoginComponent">
      <div className="row">
        <div className="col-md-offset-3 col-xs-6">
          <h1>Login</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-offset-3 col-xs-6">
          <form>
            <div className="form-group">
              <label htmlFor="identity">Username or Email</label>
              <input
                type="text"
                ref="identity"
                onChange={(event) => this._handleIdentityUpdate(event)}
                placeholder="username or email"
                className="form-control input-lg" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                ref="password"
                onChange={(event) => this._handlePasswordUpdate(event)}
                placeholder="password"
                className="form-control input-lg" />
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-md-offset-3 col-xs-6">
          <button disabled={this.state.formInvalid || this.state.isSubmitting} onClick={(event) => this._handleLogin(event)} className="btn btn-lg btn-primary">
            {this.state.isSubmitting
              ? <i className="fa fa-circle-o-notch fa-spin fa-fw" />
              : 'Login'
            }
          </button>
        </div>
      </div>
    </div>)
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})
export default  connect(mapStateToProps)(LoginComponent)
