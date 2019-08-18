const jsonConcat = require('json-concat');
const fs = require('fs');

// an array of filenames to concat
const files = [];
let newData = [];

let jsonData;

const theDirectory = __dirname + '/jsonData'; // or whatever directory you want to read
fs.readdirSync(theDirectory).forEach(file => {
  fs.readFile(`./jsonData/${file}`, function(err, data) {
    //newData.push(JSON.parse(data));
    // fs.readFile('concatJson.json', (err, file) => {
    //   var json = JSON.parse(file);
    //   // console.log('#########', JSON.parse(data));
    //   json = [...json, ...JSON.parse(data)];
    //   console.log(json);

    const dataToAppend = JSON.parse(data)[0];

    fs.appendFile('concatJson.json', JSON.stringify(dataToAppend), function(err) {
      if (err) throw err;
    });
    // });
    // console.log(newData);
  });
  // files.push(file);
});

// files.forEach(e => {
//   fs.readFile(`./jsonData/${e}`, function(err, data) {
//     fs.readFile('./concatJson.json', (err, file) => {
//       var json = JSON.parse(file);

//       // console.log('#########', JSON.parse(data));
//       json = [...json, ...JSON.parse(data)];

//       fs.writeFile('concatJson.json', JSON.stringify(json), function(err) {
//         if (err) throw err;
//       });
//     });
//   });
// });

// const finalFunc = () => {
//   jsonData = JSON.stringify(newData);

//   fs.writeFile('concatData.json', jsonData, function(err) {
//     if (err) throw err;
//     console.log('Saved!');
//   });
// };

// jsonConcat(
//   {
//     src: './jsonData',
//     dest: './result.json'
//   },
//   function(json) {
//     console.log(json);
//   }
// );
