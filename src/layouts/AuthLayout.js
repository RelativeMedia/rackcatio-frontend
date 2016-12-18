/**
 * Created by mhdevita on 12/14/16.
 */

import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Header from '../components/Header'

const { object, element } = PropTypes
class AuthLayout extends Component {
  static contextTypes = {
    store: object
  }

  static propTypes = {
    children: element.isRequired,
    data: object.isRequired
  }

  render() {
    const { children } = this.props
    return (<div className="AuthLayout">
      <div className="container">
        {children}
      </div>
    </div>)
  }
}

const mapStateToProps = (state) => ({
  data: state.data
})
export default connect(mapStateToProps)(AuthLayout)
