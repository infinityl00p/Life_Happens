import { ADD_EVENT, EDIT_EVENT, EVENTS_FETCH_SUCCESS } from '../actions/types';

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
    return {
      ...state,
      countdowns: state.countdowns.map((countdown) => {
        if (countdown.id !== action.payload.id) {
          return countdown;
        } else if (countdown.id === action.payload.id) {
          return {
            id: action.payload.id,
            name: action.payload.eventName,
            date: action.payload.eventDate,
            time: action.payload.eventTime,
            image: action.payload.image
          };
        }
      })
    };

    default:
      return state;
  }
};
