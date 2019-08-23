const fs = require('fs');
const data = require('./tempChecked.json');

const finalData = [];

data.forEach(e => {
  if (e.linkStatus === 200) {
    finalData.push({ ...e, linkAvailable: true });
  } else {
    finalData.push({ ...e, linkAvailable: false });
  }
});

const json = JSON.stringify(finalData);

fs.writeFile('finalData.json', json, 'utf8', function(err) {
  if (err) {
    console.log('An error occured while writing JSON Object to File.');
    return console.log(err);
  }

  console.log('JSON file has been saved.');
});
