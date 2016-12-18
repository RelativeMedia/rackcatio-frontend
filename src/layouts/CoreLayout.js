/**
 * Created by mhdevita on 12/14/16.
 */

import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const { object, element } = PropTypes
class CoreLayout extends Component {
  static contextTypes = {
    store: object,
    router: object
  }

  static propTypes = {
    children: element.isRequired,
    data: object.isRequired
  }

  render() {
    const { children, app, auth: { user } } = this.props
    const { router } = this.context
    return (<div className="CoreLayout">
      <Header />
      <div className="container-fluid">
        <Sidebar user={user} isActive={router.isActive} navigation={app.navigation} />
        <div className="main-panel">
          {children}
        </div>
      </div>
    </div>)
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
  app: state.app,
  auth: state.auth
})
export default connect(mapStateToProps)(CoreLayout)
