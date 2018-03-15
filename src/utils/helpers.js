import Moment from 'moment';

module.exports = {
  createDateObject: (dateString, timeString) => {
    const [year, month, day] = dateString.split('-');
    const [hours, minutes] = timeString.split(':');

    return new Date(year, month - 1, day, hours, minutes);
  },

  getDateObject: (date, time) => {
    const [year, month, day] = date.split('-');
    const dateObject = new Date(year, month - 1, day);

    const [hours, minutes] = time.split(':');
    dateObject.setHours(hours);
    dateObject.setMinutes(minutes);

    return dateObject;
  },

  getTimeLeft: (dateObject) => {
    const now = Moment(new Date());
    const eventDate = Moment(dateObject);

    const diffDuration = Moment.duration(eventDate.diff(now));

    return {
      days: Math.floor(diffDuration.asDays()),
      hours: diffDuration.hours(),
      minutes: diffDuration.minutes(),
      seconds: diffDuration.seconds()
    };
  },

  getShorthandDateTime: (eventDate) => {
    return (
      `${eventDate.format('MMM')} ${eventDate.format('DD')} @ ${eventDate.format('hh A')}`
    );
  }
};
