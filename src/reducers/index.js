import { combineReducers } from 'redux';
import CountdownReducer from './CountdownReducer';

export default combineReducers({
  countdowns: CountdownReducer
});
