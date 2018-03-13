import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import EventActionReducer from './EventActionReducer';
import EventFieldReducer from './EventFieldReducer';

export default combineReducers({
  auth: AuthReducer,
  countdowns: EventActionReducer,
  EventFields: EventFieldReducer
});
