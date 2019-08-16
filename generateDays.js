var moment = require('moment');

function getDates(startDate, stopDate) {
  var dateArray = [];
  var currentDate = moment(startDate);
  var stopDate = moment(stopDate);
  while (currentDate <= stopDate) {
    dateArray.push({
      start: moment(currentDate).format('DD.MM.YYYY'),
      end: moment(currentDate).format('DD.MM.YYYY')
    });
    currentDate = moment(currentDate).add(1, 'days');
  }
  return dateArray;
}

module.exports = getDates;
