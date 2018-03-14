import firebase from 'firebase';
import { EVENT_NAME_CHANGED,
  EVENT_DATE_CHANGED,
  EVENT_TIME_CHANGED,
  EVENT_IMAGE_CHANGED,
  ADD_EVENT,
  EDIT_EVENT,
  COUNTDOWN_FIELDS_RESET,
  EVENTS_FETCH_SUCCESS
} from './types';
import { Actions } from 'react-native-router-flux';

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
  //eventObject.id = Math.floor((Math.random() * 10000) + 1);
  const { name, date, time, image } = eventObject;
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/events`)
      .push({ name, date, time, image })
      .then(() => {
        dispatch({ type: ADD_EVENT, payload: eventObject });
      });
  };
};

export const eventsFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/events`)
      .on('value', snapshot => {
        dispatch({ type: EVENTS_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const deleteEvent = (eventId) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/events/${eventId}`)
      .remove()
      .then(() => {
        Actions.pop();
      });
  };
};

export const editEvent = (eventObject) => {
  return {
    type: EDIT_EVENT,
    payload: eventObject
  };
};
