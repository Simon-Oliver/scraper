const getMonthDateRange = (year, month) => {
  var moment = require('moment');

  // month in moment is 0 based, so 9 is actually october, subtract 1 to compensate
  // array is 'year', 'month', 'day', etc
  var startDate = moment([year, month - 1]);

  // Clone the value before .endOf()
  var endDate = moment(startDate).endOf('month');

  // just for demonstration:
  //   console.log(startDate.toDate());
  //   console.log(endDate.toDate());

  // make sure to call toDate() for plain JavaScript date type
  return { start: startDate.format('DD.MM.YYYY'), end: endDate.format('DD.MM.YYYY') };
};

const getMonthsDateRangeYear = year => {
  const months = [];
  for (let index = 1; index <= 12; index++) {
    months.push(getMonthDateRange(year, index));
  }
  return months;
};

module.exports = getMonthsDateRangeYear;
