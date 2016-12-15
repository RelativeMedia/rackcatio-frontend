/**
 * Created by mhdevita on 12/14/2016.
 */
import * as KEYS from './keys';
import _ from 'lodash';

// import { actions as Auth } from 'store/auth'
// import { actions as Notification } from 'store/notification'

const SET_HAS_ERROR = 'SET_HAS_ERROR';

export const setHasError = (stateKey, hasError, errors) => ({
  type: 'SET_HAS_ERROR',
  payload: {
    hasError,
    stateKey,
    errors
  }
});

export const getErrors = (state, stateKey) => {
  return state.hasError[stateKey];
};

function _applyHasError (state, action) {
  const { stateKey, hasError, errors } = action.payload;
  return { ...state, [stateKey]: hasError, errors };
}

const ACTION_HANDLERS = {
  [SET_HAS_ERROR]: (state, action) => {
    return _applyHasError(state, action);
  }
};

export const handleApiErrors = (key, hasError = true, errors) => (dispatch) => {
  if (!_.isEmpty(errors)) {
    let { status } = errors;
    dispatch(setHasError(key, hasError, errors));
    if (status === 401) {
      // dispatch(Auth.logout())
      const message = 'Login expired, please login again.';
    }

    // dispatch(Notification.emit({
    //   msg: message,
    //   visible: true,
    //   dismissable: true,
    //   type: 'danger'
    // }))
  } else {
    dispatch(setHasError(key, hasError, errors));
    // dispatch(Notification.emit({
    //   msg: 'Unkown server error occured, please try again later.',
    //   visible: true,
    //   dismissable: true,
    //   type: 'danger'
    // }))
  }
};

let initialState = {};
_.each(KEYS, (k) => {
  if (k !== 'undefined') {
    initialState[k] = false;
  }
});

export function hasErrorReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
