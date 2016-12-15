/**
 * Created by mhdevita on 12/14/16.
 */

import React, { PropTypes, Component } from 'react';
import { browserHistory, Router } from 'react-router';
import { connect } from 'react-redux';

const { object, element } = PropTypes;
import { actions as Auth } from '../../reducers/auth';

export default function Authenticated (Component) {
  class AuthenticationComponent extends Component {
    static propTypes = {
      auth: object.isRequired
    }

    static contextTypes = {
      store: object.isRequired,
      router: object.isRequired
    }

    componentWillMount() {
      const { auth } = this.props;
      const { dispatch } = this.props;

      if (!auth.user || !auth.token) {
        dispatch(Auth.setup());
      } else {
        this.checkAuth(auth.isAuthenticated);
      }
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps.auth.isAuthenticated);
    }

    checkAuth(isAuthenticated) {
      const { router } = this.context
      if (!isAuthenticated) {
        router.replace('/auth/login');
      }
    };

    render() {
      const {auth} = this.props;

      return (<div>
        {
          auth.isAuthenticated === true
            ? <Component {...this.props} />
            : null
        }
      </div>)
    }
  }

  const mapStateToProps = (state) => ({
    auth: state.auth
  });

  return connect(mapStateToProps)(AuthenticationComponent);
}


