import React, { PropTypes } from 'react'
import { Alert } from 'react-bootstrap'

const NotificationItem = ({ dismiss, item: { style, dismissable, title, message } }) => (
  <div className='NotificationItem'>
    <Alert
      bsStyle={style}
      onDismiss={(dismissable) ? dismiss : null}
    >
      {title &&
        <h4>{title}</h4>
      }
      <p>{message}</p>
    </Alert>
  </div>
)

NotificationItem.propTypes = {
  dismiss: PropTypes.func,
  item: PropTypes.object.isRequired
}
export default NotificationItem
