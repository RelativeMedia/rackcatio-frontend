/**
 * Created by mhdevita on 12/14/16.
 */

import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { actions as Data } from '../reducers/data'

const { object, element } = PropTypes
class AppContainer extends Component {
  static contextTypes = {
    store: object
  }

  componentDidMount () {
    const { dispatch } = this.context.store
    dispatch(Data.load('item'))
  }
  render() {
    const { children } = this.props
    return (<div className="AppContainer">
      {children}
    </div>)
  }
}

AppContainer.propTypes = {
  children: element.isRequired,
  data: object.isRequired
}

const mapStateToProps = (state) => ({
  data: state.data
})
export default connect(mapStateToProps)(AppContainer)
