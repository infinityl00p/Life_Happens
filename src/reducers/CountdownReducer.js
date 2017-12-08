import data from './CountdownList.json';
import { ADD_EVENT } from '../actions/types';

const INITIAL_STATE = {countdowns: data};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_EVENT:
      return {
        countdowns: [...state.countdowns, action.payload]
      };

    default:
      return state;
  }
};
