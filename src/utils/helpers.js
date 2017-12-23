import Moment from 'moment';

module.exports = {
  parseDateString: (dateString) => {
    const [year, month, day] = dateString.split('-');
    return new Date(year, month - 1, day);
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
      days: diffDuration.days(),
      hours: diffDuration.hours(),
      minutes: diffDuration.minutes(),
      seconds: diffDuration.seconds()
    };
  }
};
