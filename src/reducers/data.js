/**
 * Created by mhdevita on 12/14/16.
 */
import { normalize } from 'normalizr';
import Schemas from './schema';
import _ from 'lodash';

import Api from '../middleware/Api';
import { LOAD_DATA, LOADED_DATA } from './constants';
import { KEYS, setIsLoading, setHasResults, handleApiErrors } from './StateKeys';

const initialState = {
  entities: {},
  result: [],
  params: {},
  errors: []
};

const _load = (params = {}) => ({
  type: LOAD_DATA,
  params
});

const _loaded = (payload = {}) => ({
  type: LOADED_DATA,
  payload
});

const load = (endpoint, params) => {
  return ((dispatch) => {
    dispatch(_load(params));
    dispatch(setIsLoading(KEYS.ITEM, true));
    Api
      .get(endpoint, { auth: true })
      .then(({ data: { data } }) => {
        dispatch(setIsLoading(KEYS.ITEM, false));
        dispatch(setHasResults(KEYS.ITEM, !_.isEmpty(data)));
        dispatch(_loaded(normalize(data, Schemas.arrayOfItems)));
      })
      .catch((error) => {
        dispatch(setIsLoading(KEYS.ITEM, false));
        dispatch(handleApiErrors(KEYS.ITEM, true));
      });
  });
};

export const actions = {
  load
};

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
};

export default function authReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
// export default function dataReducer (state = initialState, action) {
//   let newState = Object.assign({}, state);
//
//   switch(action.type) {
//     case LOAD_DATA:
//       newState.params = action.params;
//       return newState;
//       break;
//     case LOADED_DATA:
//       newState.entities = action.payload.entities;
//       newState.result = action.payload.result;
//       return newState;
//     break;
//     default:
//       return state;
//     break;
//   }
// }

