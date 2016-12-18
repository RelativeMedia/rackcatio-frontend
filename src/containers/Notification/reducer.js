const EMIT_NOTIFICATION = 'EMIT_NOTIFICATION'
const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION'

const initialState = {
  maxItems: 4,
  dismissTimeout: 10000, // 10 seconds
  items: [],
  queue: []
}

class NotificationItem {
  constructor (item) {
    this.title = item.title || null
    this.message = item.message || null
    this.style = item.type || 'info'
    this.dismissable = item.dismissable || true
    this.visible = (typeof item.visible === 'undefined') ? true : item.visible
  }
}

// let _timeouts = []
const _emit = (payload = {}) => ({
  type: EMIT_NOTIFICATION,
  payload
})
const _dismiss = (index = 0) => ({
  type: HIDE_NOTIFICATION,
  index
})

export function emit (payload = {}) {
  return (dispatch, getState) => {
    dispatch(_emit(payload))
    // const state = getState().notification
    // const dismissTimeout = payload.timeout || state.dismissTimeout
    // const timeoutId = setTimeout(() => {
    //   dispatch(dismiss())
    // }, dismissTimeout)
  }
}

export function dismiss (index = 0) {
  return (dispatch, getState) => {
    dispatch(_dismiss(index))
  }
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [EMIT_NOTIFICATION] : (state, action) => {
    let newState = Object.assign({}, state)
    let newNotification = new NotificationItem(action.payload)
    if (newState.items.length >= newState.maxItems) {
      newState.queue = [
        ...newState.queue,
        {
          ...newNotification
        }
      ]
    } else {
      newState.items = [
        ...newState.items,
        {
          ...newNotification
        }
      ]
    }
    return newState
  },

  [HIDE_NOTIFICATION]: (state, { index }) => {
    let newState = Object.assign({}, state)

    // clear all notifications by returning initialState
    if (index === -1) {
      newState.items = []
      return newState
    } else {
      newState.items = [
        ...newState.items.slice(0, index),
        ...newState.items.slice(index + 1)
      ]

      if ((newState.queue.length > 0) && (newState.items.length < newState.maxItems)) {
        // how many slots do we have left? in case we had 1 displayed and suddenly added a lot more to the queue
        let slots = initialState.maxItems - newState.items.length - 1
        newState.items = [
          ...newState.items.slice(0, index),
          ...newState.items.slice(index + 1),
          ...newState.queue.slice(0, slots)
        ]
        newState.queue = newState.queue.slice(slots)
      }
      return newState
    }
  }
}

export const actions = {
  emit,
  dismiss
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function notificationReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
