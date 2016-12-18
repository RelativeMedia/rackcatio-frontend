/**
 * Created by mhdevita on 12/14/2016.
 */
import * as KEYS from './keys'
import lodash from 'lodash'
const SET_IS_LOADING = 'SET_IS_LOADING'
export const setIsLoading = (stateKey, isLoading) => ({
  type: 'SET_IS_LOADING',
  payload: {
    isLoading,
    stateKey
  }
})

export const getIsLoading = (state, stateKey) => {
  return state.isLoading[stateKey]
}

function _applyIsLoading (state, action) {
  const { stateKey, isLoading } = action.payload
  return { ...state, [stateKey]: isLoading }
}

const ACTION_HANDLERS = {
    [SET_IS_LOADING]: (state, action) => {
    return _applyIsLoading(state, action)
  }
}

let initialState = {}
lodash.each(KEYS, (k) => {
  if (k !== 'undefined') {
  initialState[k] = false
}
})

export function isLoadingReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
