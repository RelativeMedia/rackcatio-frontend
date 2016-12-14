// Set up your root reducer here...
import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import data from './data';

const rootReducer = combineReducers({
  data,
  routing: routerReducer
});

export default rootReducer;
