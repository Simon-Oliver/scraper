const cheerio = require('cheerio');
const fetch = require('node-fetch');
const fs = require('fs');
const getDates = require('./generateDays');

//getDates('20170101', '20171231');
const getMonthsDateRangeYear = require('./getmonthsDateRange');

const daysArr = getMonthsDateRangeYear(2019);

const allMonthsInYear = async daysArr => {
  let allDataInYear = [];

  const promises = daysArr.map(async e => {
    await getPages('еу референдум', { start: e.start, end: e.end }).then(
      dataMonths => (allDataInYear = allDataInYear.concat(dataMonths))
    );
  });
  // wait until all promises are resolved
  await Promise.all(promises);
  return allDataInYear;

  // monthsArr.forEach(async e => {
  //   try {
  //     const dataMonths = await getPages('ЕУ референдум', { start: e.start, end: e.end });
  //     allDataInYear.push(dataMonths);
  //   } catch (e) {
  //     console.error(e.message);
  //   }
  // });
  //   return allDataInYear;
};

const getPages = async (searchTerm, dates) => {
  let arr = [];
  for (let index = 1; index <= 10; index++) {
    const url = `https://time.mk/?q=${searchTerm}&search=news&order=dec&startdate=${
      dates.start
    }&enddate=${dates.end}&page=${index}`;
    const res = encodeURI(url);

    try {
      let p1 = await fetch(res)
        .then(res => res.text())
        .then(data => {
          return scrapePage(data);
        });
      arr = arr.concat(p1);
    } catch (e) {
      console.error(e.message);
    }
  }
  //console.log('Return', arr.length);
  return arr;
};
const scrapePage = data => {
  const dataArr = [];
  const $ = cheerio.load(data);

  const length = $('div.cluster').length;

  if (length === 0) {
    return [];
  } else {
    const searchResults = $(' #c0 > span:nth-child(2) > span:nth-child(1)')
      .text()
      .split(' ')[1];

    const searchQuery = $(
      '#news_pane > form:nth-child(8) > div:nth-child(1) > input:nth-child(1)'
    ).attr('value');

    $('div.cluster').each(function(i, e) {
      const obj = {};
      obj.link = `https://time.mk/${$(e)
        .find('h1 a')
        .attr('href')}`;
      obj.title = $(e)
        .find('h1 a')
        .text();
      obj.source = $(e)
        .find('.source')
        .text();
      obj.published = $(e)
        .find('.when')
        .text()
        .trim();
      obj.snipped = $(e)
        .find('.snippet')
        .text();
      obj.searchResults = searchResults;
      obj.searchQuery = searchQuery;
      dataArr.push(obj);
    });
    //console.log(dataArr);
    return dataArr;
  }
};

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

allMonthsInYear(daysArr).then(data => {
  console.log('DONE', data.length);
  var jsonContent = JSON.stringify(data);

  fs.writeFile('output.json', jsonContent, 'utf8', function(err) {
    if (err) {
      console.log('An error occured while writing JSON Object to File.');
      return console.log(err);
    }

    console.log('JSON file has been saved.');
  });
});
