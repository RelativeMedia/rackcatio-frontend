/**
 * Created by mhdevita on 12/14/16.
 */
import log from '../middleware/logger'

import { LOAD_APP_CONFIG, LOADED_APP_CONFIG } from './constants'

const _load = () => ({
  type: LOAD_APP_CONFIG
})

const _loaded = () => ({
  type: LOADED_APP_CONFIG
})

const load = () => (dispatch) => {
  dispatch(_load())
  dispatch(_loaded())
}

export const actions = {
  load
}

const ACTION_HANDLERS = {
  [LOAD_APP_CONFIG]: (state, { params }) =>({
    ...state
  }),
  [LOADED_APP_CONFIG]: (state, { payload }) => ({
    ...state
  })
}

const initialState = {
  title: 'Rackcat.io',
  navigation: [
    {
      name: 'Dashboard',
      path: '/app'
    },
    {
      name: 'Subnets',
      path: '/app/subnets'
    },
    {
      name: 'Product Keys',
      path: '/app/productkeys'
    },
    // {
    //   name: 'Racks',
    //   path: '/app/racks'
    // },
    // {
    //   name: 'Subnets',
    //   path: '/app/subnets'
    // },
    // {
    //   name: 'Domains',
    //   path: '/app/domains'
    // },
    // {
    //   name: 'Locations',
    //   path: '/app/locations'
    // }
  ]
}

export default function appReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
