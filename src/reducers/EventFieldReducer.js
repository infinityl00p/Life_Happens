import {
  EVENT_NAME_CHANGED,
  EVENT_DATE_CHANGED,
  EVENT_TIME_CHANGED,
  EVENT_IMAGE_CHANGED,
  COUNTDOWN_FIELDS_RESET
} from '../actions/types';

const INITIAL_STATE = {
                        eventName: '',
                        eventDate: null,
                        eventTime: '',
                        imageUri: ''
                      };

export default (state = INITIAL_STATE, action) => {
  const newState = state;

  switch (action.type) {
    case EVENT_NAME_CHANGED:
      newState.eventName = action.payload;
      return { ...newState, eventName: action.payload };

    case EVENT_DATE_CHANGED:
      newState.eventDate = action.payload;
      return { ...newState, eventDate: action.payload };

    case EVENT_TIME_CHANGED:
      newState.eventTime = action.payload;
      return { ...newState, eventTime: action.payload };

    case EVENT_IMAGE_CHANGED:
      newState.imageUri = action.payload;
      return { ...newState, imageUri: action.payload };

    case COUNTDOWN_FIELDS_RESET:
      return { INITIAL_STATE };

    default:
      return state;
  }
};
