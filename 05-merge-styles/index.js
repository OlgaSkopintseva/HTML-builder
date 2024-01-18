const fs = require('fs');
const path = require('path');
const pathToFolder = path.join(__dirname, 'styles');
const pathToCSS = '05-merge-styles/project-dist/bundle.css';
const dataArray = [];
let fileProcessed = 0;

fs.readdir(pathToFolder, (err, files) => {
  if (err) {
    console.log(err);
    return;
  }

  files.forEach((file) => {
    const pathToFile = path.join(__dirname, 'styles', file);
    fs.stat(pathToFile, (err, stats) => {
      if (err) {
        console.error(err);
        return;
      }

      const extname = path.extname(file).slice(1);
      if (stats.isFile() && extname === 'css') {
        fs.readFile(pathToFile, 'utf-8', (err, data) => {
          if (err) {
            console.log(err);
            return;
          }

          dataArray.push(data);
          fileProcessed++;

          if (fileProcessed === files.length) {
            writeDataToFile();
          }
        });
      } else {
        fileProcessed++;
        if (fileProcessed === files.length) {
          writeDataToFile();
        }
      }
    });
  });
});

function writeDataToFile() {
  const dataString = dataArray.join('\n');
  fs.writeFile(pathToCSS, dataString, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('The data has been successfully added to the file.');
  });
}
