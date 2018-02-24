import { EVENT_NAME_CHANGED,
  EVENT_DATE_CHANGED,
  EVENT_TIME_CHANGED,
  EVENT_IMAGE_CHANGED,
  ADD_EVENT,
  DELETE_EVENT,
  EDIT_EVENT,
  COUNTDOWN_FIELDS_RESET
} from './types';

export const updateEventName = (text) => {
//TODO: confirm event name changed
  return {
    type: EVENT_NAME_CHANGED,
    payload: text
  };
};


export const updateEventDate = (date) => {
//TODO: only change if server response received
  return {
    type: EVENT_DATE_CHANGED,
    payload: date
  };
};


export const updateEventTime = (time) => {
//TODO: only change if server response received
  return {
    type: EVENT_TIME_CHANGED,
    payload: time
  };
};

export const updateEventImage = (imageUri) => {
  console.log(imageUri);
  return {
    type: EVENT_IMAGE_CHANGED,
    payload: imageUri
  };
};

export const resetCountdownFields = () => {
  return {
    type: COUNTDOWN_FIELDS_RESET
  };
};

export const addEvent = (eventObject) => {
  //TODO: id should be server response
  eventObject.id = Math.floor((Math.random() * 10000) + 1);

  return {
    type: ADD_EVENT,
    payload: eventObject
  };
};

export const deleteEvent = (eventId) => {
//TODO: get a server response
  return {
    type: DELETE_EVENT,
    payload: eventId
  };
};

export const editEvent = (eventObject) => {
  return {
    type: EDIT_EVENT,
    payload: eventObject
  };
};
