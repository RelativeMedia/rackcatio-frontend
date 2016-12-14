/**
 * Created by mhdevita on 12/14/16.
 */
import { normalize } from 'normalizr';
import Schema from './schema';

import { LOAD_DATA, LOADED_DATA } from './constants';
import Api from '../middleware/Api';

const initialState = {
  entities: {},
  result: []
};

const _load = (params = {}) => ({
  type: LOAD_DATA,
  params
})

const _loaded = (payload = {}) => ({
  type: LOADED_DATA,
  payload
})

const loadData = (endpoint, params, payload) => {
  // stub data for now
  return ((dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(_load(params))
      Api.get('item', { auth: true })
        .then((results) => {
          dispatch(_loaded(results))
        })
    })
  })
}

export const actions = {
  loadData
}

export default function dataReducer (state = initialState, action) {
  let newState;

  switch(action.type) {
    case LOAD_DATA:
      return state;
      break;
    case LOADED_DATA:

    default:
      return state;
      break;
  }
}

