import { EVENT_NAME_CHANGED,
        EVENT_DATE_CHANGED,
        ADD_EVENT } from './types';

export const eventNameChanged = (text) => {
  return {
    type: EVENT_NAME_CHANGED,
    payload: text
  };
};


export const eventDateChanged = (date) => {
  return {
    type: EVENT_DATE_CHANGED,
    payload: date
  };
};


export const addEvent = (eventObject) => {
  //TODO, black for default, otherwise choose a pic
  eventObject.image = 'https://i.pinimg.com/736x/4c/1b/a0/4c1ba072483b43940e8f5b4281f9e65f--solid-background-wallpaper-solid-color-wallpaper.jpg';
  //TODO, id should be server response
  eventObject.id = Math.floor((Math.random() * 10000) + 1);

  return {
    type: ADD_EVENT,
    payload: eventObject
  };
};
