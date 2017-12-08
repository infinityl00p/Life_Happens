import { combineReducers } from 'redux';
import CountdownReducer from './CountdownReducer';
import AddEventReducer from './AddEventReducer';

export default combineReducers({
  countdowns: CountdownReducer,
  addEventReducer: AddEventReducer
});
