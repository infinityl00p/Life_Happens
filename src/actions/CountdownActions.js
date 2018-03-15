import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { EVENT_NAME_CHANGED,
  EVENT_DATE_CHANGED,
  EVENT_TIME_CHANGED,
  EVENT_IMAGE_CHANGED,
  ADD_EVENT,
  COUNTDOWN_FIELDS_RESET,
  EVENTS_FETCH_SUCCESS
} from './types';

export const updateEventName = (text) => {
  return {
    type: EVENT_NAME_CHANGED,
    payload: text
  };
};


export const updateEventDate = (date) => {
  return {
    type: EVENT_DATE_CHANGED,
    payload: date
  };
};


export const updateEventTime = (time) => {
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

export const editEvent = ({ id, date, image, name, time }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/events/${id}`)
      .update({ date, image, name, time })
      .then(() => {
        Actions.pop({ refresh: {
          id,
          imageUrl: image,
          eventName: name,
          eventDate: date,
          eventTime: time
        } });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
