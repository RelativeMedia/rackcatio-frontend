// Set up your root reducer here...
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import data from './data';
import auth from './auth';
import { isLoadingReducer, hasResultsReducer, hasErrorReducer } from './StateKeys';

const rootReducer = combineReducers({
  data,
  auth,
  hasError: hasErrorReducer,
  hasResults: hasResultsReducer,
  isLoading: isLoadingReducer,
  routing: routerReducer
});

export default rootReducer;
