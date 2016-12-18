/**
 * Created by mhdevita on 12/15/16.
 */
import React, { PropTypes, Component } from 'react'
import _ from 'lodash'
import classnames from 'classnames'
import { Link } from 'react-router'
const { object, array, func } = PropTypes

class SidebarComponent extends Component {
  static propTypes = {
    user: object.isRequired,
    navigation: array.isRequired,
    isActive: func.isRequired
  }

  render () {
    const { user, navigation, isActive } = this.props
    const greeting = () => {
      const date = new Date().getHours()
      if (date >= 12 < 16) {
        return 'Good Afternoon ' + user.username
      } else if (date >= 16) {
        return 'Good Evening ' + user.username
      } else {
        return 'Good Morning ' + user.username
      }
    }

    const navigationItems = navigation.map((item, index) => {
      return (<li to={item.path} key={index} className={classnames({ active: isActive(item.path, true) })}>
        <Link to={item.path}>{item.name}</Link>
      </li>)
    })
    return (<div className="SidebarComponent">
      <div className="sidebar">
        <div className="row">
          <div className="col-lg-12 text-center profilePhoto">
            <img src="//lorempixel.com/200/200/people" className="img img-circle" />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 text-center">
            <p className="greeting">{greeting()}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 text-center">
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <ul className="nav nav-pills nav-stacked">
              {navigationItems}
            </ul>
          </div>
        </div>
      </div>
    </div>)
  }
}
export default SidebarComponent
