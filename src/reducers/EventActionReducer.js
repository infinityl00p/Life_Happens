import data from './CountdownList.json';
import { ADD_EVENT, DELETE_EVENT, EDIT_EVENT } from '../actions/types';

const INITIAL_STATE = { countdowns: data };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_EVENT:
      return {
        countdowns: [...state.countdowns, action.payload]
      };

    case DELETE_EVENT:
      return {
        ...state,
        countdowns: state.countdowns.filter((countdown) => {
          return countdown.id !== action.payload;
        })
      };

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
            image: countdown.image
          };
        }
      })
    };

    default:
      return state;
  }
};
