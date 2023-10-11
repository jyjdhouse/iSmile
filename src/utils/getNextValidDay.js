const isValidDay = require('./isValidDay');
module.exports = function (date) {
    while (!isValidDay(date)) {
      date.setDate(date.getDate() + 1);
    }
    return date;
  }