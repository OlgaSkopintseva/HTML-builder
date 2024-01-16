const fs = require('fs');
const path = require('path');
const pathToFolder = '03-files-in-folder/secret-folder';

fs.readdir(pathToFolder, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
  }
  files.forEach((file) => {
    const filePath = path.join(pathToFolder, file);
    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error(`Error getting file info for ${file}`, err);
      }
      const basename = path.basename(file);
      const extname = path.extname(file).slice(1);
      const size = stats.size / 1024;
      if (stats.isFile()) {
        console.log(`${basename} - ${extname} - ${size}kb - is file.`);
      }
    });
  });
});