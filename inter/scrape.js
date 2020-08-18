const cheerio = require('cheerio');
const fetch = require('node-fetch');
const fs = require('fs');

let count = 0;

const getData = async () => {
  const html = await fetch('https://www.meinprospekt.de/filialen/intersport')
    .then((res) => res.text())
    .then((data) => {
      return data;
    });

  const $ = cheerio.load(html);
  const arr = $('li > a > span[itemprop="branchOf"]');

  console.log(arr.length);
  count += arr.length;
};

getData();
console.log('------->', count);
