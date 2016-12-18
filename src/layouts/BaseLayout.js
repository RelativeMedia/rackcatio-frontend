/**
 * Created by mhdevita on 12/14/16.
 */

import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Header from '../components/Header'

const { object, element } = PropTypes
class BaseLayout extends Component {
  static contextTypes = {
    store: object
  }

  static propTypes = {
    children: element.isRequired,
    data: object.isRequired
  }

  render() {
    const { children } = this.props
    return ( <div className="BaseLayout">
      {children}
    </div>)
  }
}

const mapStateToProps = (state) => ({
  data: state.data
})
export default connect(mapStateToProps)(BaseLayout)
