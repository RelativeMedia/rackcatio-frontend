import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Button, ButtonGroup } from 'react-bootstrap'

import NotificationItem from './NotificationItem'
import notificationReducer, { actions as Notify } from './reducer'
import './styles.scss'

export class Notification extends Component {
  static propTypes = {
    notification: PropTypes.object.isRequired
  }

  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object
  }

  _handleClick = (event) => {
    event.preventDefault()
    const { dispatch } = this.context.store
    dispatch(Notify.emit({
      style: 'info',
      title: 'test 123',
      dismissable: true,
      message: new Date().toString()
    }))
  }

  _handleDismiss = (event, index) => {
    event.preventDefault()
    const { dispatch } = this.context.store
    dispatch(Notify.dismiss(index))
  }

  render () {
    const { notification } = this.props
    return (<div className='NotificationContainer'>
      <div className='text-center'>
        {(!__PROD__)
        ? <ButtonGroup>
          <Button
            bsStyle='primary'
            onClick={this._handleClick}
          >
            Emit Notification
          </Button>
          <Button
            bsStyle='default'
            onClick={(event) => { this._handleDismiss(event, -1) }}
          >
            Clear All
          </Button>
        </ButtonGroup>
        : <Button
          block
          bsStyle='default'
          onClick={(event) => { this._handleDismiss(event, -1) }}
        >
          Clear All
        </Button>
        }
        <hr />
      </div>
      {notification.items.filter((item, index) => (item.visible === true)).map((item, index) => (
        <NotificationItem dismiss={(event) => { this._handleDismiss(event, index) }} key={index} item={item} />
      ))}
    </div>)
  }
}

const mapStateToProps = (state) => ({
  notification: state.notification
})

export {
  notificationReducer,
  Notify
}
export default connect(mapStateToProps)(Notification)
