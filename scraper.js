const cheerio = require('cheerio');
const fetch = require('node-fetch');
const fs = require('fs');

const url =
  'https://time.mk/?q=%D0%B5%D1%83%20%D1%80%D0%B5%D1%84%D0%B5%D1%80%D0%B5%D0%BD%D0%B4%D1%83%D0%BC&search=news&order=dec&startdate=01.01.2017&enddate=31.01.2017&page=1';

fetch(url)
  .then(res => res.text())
  .then(data => {
    console.log(scrapePage(data));
  });

const scrapePage = data => {
  const dataArr = [];
  const $ = cheerio.load(data);

  const length = $('div.cluster').length;

  //if(length === 0)

  const searchResults = $(' #c0 > span:nth-child(2) > span:nth-child(1)')
    .text()
    .split(' ')[1];

  $('div.cluster').each(function(i, e) {
    const obj = {};
    obj.link = $(e)
      .find('h1 a')
      .attr('href');
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
    dataArr.push(obj);
  });

  return dataArr;
};
