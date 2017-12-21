module.exports = {
  parseDateString: (dateString) => {
    const [year, month, day] = dateString.split('-');
    return new Date(year, month - 1, day);
  },

  daysSincePost: (datePostedString) => {
    const datePosted = new Date(datePostedString);
    datePosted.setDate(datePosted.getDate() + 1);

    const today = new Date();

    const timeDiff = Math.abs(today.getTime() - datePosted.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return diffDays;
  }
};
