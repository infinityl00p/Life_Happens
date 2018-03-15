import {
  ADD_EVENT,
  EDIT_EVENT,
  EVENTS_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EVENTS_FETCH_SUCCESS:
      return {
        countdowns: action.payload
      };

    case ADD_EVENT:
      return state;

    case EDIT_EVENT:
      return state;

    default:
      return state;
  }
};
