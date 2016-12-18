/**
 * Created by mhdevita on 12/14/2016.
 */
import * as KEYS from './keys'
import lodash from 'lodash'
const SET_HAS_RESULTS = 'SET_HAS_RESULTS'

export const setHasResults = (stateKey, hasResults) => ({
  type: 'SET_HAS_RESULTS',
  payload: {
    hasResults,
    stateKey
  }
})

function _applyHasResults (state, action) {
  const { stateKey, hasResults } = action.payload
  return { ...state, [stateKey]: hasResults }
}

const ACTION_HANDLERS = {
    [SET_HAS_RESULTS]: (state, action) => {
    return _applyHasResults(state, action)
  }
}

let initialState = {}
lodash.each(KEYS, (k) => {
  if (k !== 'undefined') {
  initialState[k] = false
}
})

export function hasResultsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
