/**
 * Created by mhdevita on 12/14/2016.
 */
import { browserHistory } from 'react-router'
import jwtDecode from 'jwt-decode'
import _ from 'lodash'
import Api from '../middleware/Api'
import log from '../middleware/logger'
import { KEYS, setIsLoading, setHasResults, handleApiErrors } from './StateKeys'


// ------------------------------------
// Constants
// ------------------------------------
import {LOGIN, LOGGED_IN, LOGOUT, LOGGED_OUT, NOT_LOGGED_IN } from './constants'


// ------------------------------------
// Actions
// ------------------------------------
const _login = (params) => ({
  type: LOGIN,
  params
})

const  _loggedIn = (payload) => ({
  type: LOGGED_IN,
  payload
})

const _logout = (payload) => ({
  type: LOGOUT,
  payload
})

const _loggedOut = (payload) => ({
  type: LOGGED_OUT,
  payload
})

const _notLoggedIn = (payload) => ({
  type: NOT_LOGGED_IN,
  payload
})

// ------------------------------------
// Helpers
// ------------------------------------
const isAuthenticated = () => {
  log.debug('Auth.isAuthenticated() :: getToken()', !!getToken())
  return !!getToken()
}

const decodeToken = (token) => {
  if (token || token !== 'undefined') {
    return jwtDecode(token)
  }
}

const getUser = () => {
  return localStorage.getItem('user')
}

const getToken = () => {
  return localStorage.getItem('token')
}

const removeToken = () => {
  return localStorage.removeItem('token')
}

const removeUser = () => {
  return localStorage.removeItem('user')
}

const storeToken = (token) => {
  if (token || token !== 'undefined') {
    return localStorage.setItem('token', token)
  }
}

const storeUser = (user) => {
  if (user || user !== 'undefined') {
    return localStorage.setItem('user', JSON.stringify(user))
  }
}

// ------------------------------------
// Action Thunks
// ------------------------------------

/**
 * decodes the token from localStorage
 * and checks to see if its expired or not.
 */
const setup = () => (dispatch) => {
  const token = getToken()
  const decodedToken = decodeToken(token)
  const user = JSON.parse(getUser())
  const date = new Date().getTime()

  // check if the token is expired or not
  if (decodedToken.exp * 1000 < date) {
    log.debug('Auth.setup() :: token is expired, clearing it and redirecting to login pages.')
    dispatch(logout())
    browserHistory.push('/auth/login')
  } else if (token && user) {
    log.debug('Auth.setup() :: token and user exists in localStorage, initiating authLoginSuccess()')
    dispatch(_loggedIn({ user, token }))
  } else {
    log.debug('Auth.setup() :: token/user doesn\'t exist in localStorage, initiating authNotLoggedIn()')
    dispatch(_notLoggedIn())
    browserHistory.push('/auth/login')
  }
}

/**
 * Logout a user and remove token/user object
 * from localStorage.
 * Redirects to the login page.
 * @TODO: this is stubbed for now, but the backend call should be made to clear the token and do server side cleanup.
 */
const logout = () => (dispatch) => {
  dispatch(_logout())
  dispatch(setIsLoading(KEYS.AUTH, true))
  removeToken()
  removeUser()
  // mock backend call
  setTimeout(() => {
    dispatch(setIsLoading(KEYS.AUTH, false))
    dispatch(setHasResults(KEYS.AUTH, false))
    dispatch(_loggedOut())
    browserHistory.push('/auth/login')
  }, 3000)
}

/**
 * login a user
 * @param payload {Object} identity, password of user
 * @param params {Object} Any additional paramss to pass along
 */
const login = (payload, params) => (dispatch) => {
  dispatch(_login(params))
  dispatch(setIsLoading(KEYS.AUTH, true))
  log.debug('Auth::login::initial', params, payload)
  Api
    .post('auth/login', { auth: false }, payload)
    .then(({ data: { data } }) => {
      dispatch(setIsLoading(KEYS.AUTH, false))
      dispatch(setHasResults(KEYS.AUTH, !_.isEmpty(data)))
      dispatch(_loggedIn(data))
      storeToken(data.token)
      storeUser(data.user)
      browserHistory.push('/app')
    })
    .catch((error) => {
      dispatch(setIsLoading(KEYS.AUTH, false))
      dispatch(handleApiErrors(KEYS.AUTH, true, error))
    })
}

export const actions = {
  login,
  logout,
  setup,
  getToken,
  isAuthenticated
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN]: (state, { params }) =>({
    ...state,
    ...params
  }),
  [LOGGED_IN]: (state, { payload }) => ({
    ...state,
    isAuthenticated: true,
    user: payload.user,
    token: payload.token
  }),
  [LOGGED_OUT]: (state, { payload }) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    token: null
  }),
  [NOT_LOGGED_IN]: (state, { payload }) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    token: null,
    errors: payload.errors
  })
}

const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
  errors: []
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function authReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
