import { combineReducers } from 'redux';
import EventActionReducer from './EventActionReducer';
import EventFieldReducer from './EventFieldReducer';

export default combineReducers({
  countdowns: EventActionReducer,
  EventFieldReducer: EventFieldReducer
});
