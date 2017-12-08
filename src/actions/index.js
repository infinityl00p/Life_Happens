import { EVENT_NAME_CHANGED,
          EVENT_DATE_CHANGED } from './types';

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
