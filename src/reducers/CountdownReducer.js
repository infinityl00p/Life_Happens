import data from './CountdownList.json';
import { ADD_EVENT, DELETE_EVENT } from '../actions/types';

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

    default:
      return state;
  }
};
