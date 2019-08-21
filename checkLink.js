const fetch = require('node-fetch');
const links = require('./concatJson.json');
const fs = require('fs');

const retrieveStatus = async url => {
  try {
    const res = await fetch(url);
    const { status } = res;
    return status;
  } catch (err) {
    // handle error for example
    console.error(err);
  }
};

const checkLink = async urls => {
  let length = urls.length;
  const urlsChecked = [];
  for (const e of urls) {
    console.log(length);
    const checked = await retrieveStatus(e.link);
    urlsChecked.push({ ...e, linkStatus: checked });
    length--;
  }
  return urlsChecked;
};

checkLink(links).then(data => {
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
