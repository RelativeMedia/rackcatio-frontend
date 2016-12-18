/**
 * Created by mhdevita on 12/14/16.
 */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

const { object } = PropTypes
import { actions as Auth } from '../../reducers/auth'

export default function Authenticated (Component) {
  class AuthenticationComponent extends React.Component {
    static propTypes = {
      auth: object.isRequired
    }

    static contextTypes = {
      store: object.isRequired,
      router: object.isRequired
    }

    componentWillMount() {
      const { auth } = this.props
      const { dispatch } = this.context.store

      if ((!auth.user || !auth.token) && Auth.isAuthenticated()) {
        dispatch(Auth.setup())
      } else {
        this.checkAuth(auth.isAuthenticated)
      }
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps.auth.isAuthenticated)
    }

    checkAuth(isAuthenticated) {
      const { router } = this.context
      if (!isAuthenticated) {
        router.replace('/auth/login')
      }
    }

    render() {
      return (<Component {...this.props} />)
    }
  }

  const mapStateToProps = (state) => ({
    auth: state.auth
  })

  return connect(mapStateToProps)(AuthenticationComponent)
}


