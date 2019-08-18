const jsonConcat = require('json-concat');
const fs = require('fs');

// an array of filenames to concat
const files = [];

const theDirectory = __dirname; // or whatever directory you want to read
fs.readdirSync(theDirectory).forEach(file => {
  // you may want to filter these by extension, etc. to make sure they are JSON files
  fs.open(file, (err, fd) => {
    console.log(JSON.parse(fd));
  });
  //files.push(file);
});

console.log(files);
// pass the "files" to json concat
// jsonConcat(
//   {
//     src: files,
//     dest: './result.json'
//   },
//   function(err, json) {
//     if (err) console.log(err);
//     console.log(json);
//   }
// );
