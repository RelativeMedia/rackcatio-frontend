// Set up your root reducer here...
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import data from './data'
import auth from './auth'
import app from './app'
import { notificationReducer } from '../containers/Notification'
import { isLoadingReducer, hasResultsReducer, hasErrorReducer } from './StateKeys'

const rootReducer = combineReducers({
  app,
  data,
  auth,
  notification: notificationReducer,
  hasError: hasErrorReducer,
  hasResults: hasResultsReducer,
  isLoading: isLoadingReducer,
  routing: routerReducer
})

export default rootReducer
