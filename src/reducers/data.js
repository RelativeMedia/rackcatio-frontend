/**
 * Created by mhdevita on 12/14/16.
 */
import { normalize } from 'normalizr'
import Schemas from './schema'
import _ from 'lodash'

import Api from '../middleware/Api'
import { LOAD_DATA, LOADED_DATA } from './constants'
import { KEYS, setIsLoading, setHasResults, handleApiErrors } from './StateKeys'

const initialState = {
  entities: {},
  result: [],
  params: {},
  errors: []
}

const _load = (params = {}) => ({
  type: LOAD_DATA,
  params
})

const _loaded = (payload = {}) => ({
  type: LOADED_DATA,
  payload
})

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

const load = (endpoint, params) => {
  return ((dispatch) => {
    dispatch(_load(params))
    dispatch(setIsLoading(KEYS.ITEM, true))
    Api
      .get(endpoint, { auth: true })
      .then(({ data: { data } }) => {
        dispatch(setIsLoading(KEYS.ITEM, false))
        dispatch(setHasResults(KEYS.ITEM, !_.isEmpty(data)))
        const pluralizedKey = toTitleCase((endpoint + 's'))
        dispatch(_loaded(normalize(data, Schemas['arrayOf' + pluralizedKey])))
      })
      .catch((error) => {
        dispatch(setIsLoading(KEYS.ITEM, false))
        dispatch(handleApiErrors(KEYS.ITEM, true, error))
      })
  })
}

export const actions = {
  load
}

const ACTION_HANDLERS = {
  [LOAD_DATA]: (state, { params }) =>({
    ...state,
    ...params
  }),
  [LOADED_DATA]: (state, { payload }) => ({
    ...state,
    entities: {
      ...payload.entities
    },
    result: [
      ...payload.result
    ]
  })
}

export default function authReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

