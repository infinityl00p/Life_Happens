import { EVENT_NAME_CHANGED, EVENT_DATE_CHANGED, EVENT_TIME_CHANGED } from '../actions/types';

const INITIAL_STATE = {
                        eventName: '',
                        eventDate: null,
                        eventTime: null
                      };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EVENT_NAME_CHANGED:
      state.eventName = action.payload;
      return { ...state, eventName: action.payload };

    case EVENT_DATE_CHANGED:
      state.eventDate = action.payload;
      return { ...state, eventDate: action.payload };

    case EVENT_TIME_CHANGED:
      state.eventTime = action.payload;
      return { ...state, eventTime: action.payload };

    default:
      return state;
  }
};
