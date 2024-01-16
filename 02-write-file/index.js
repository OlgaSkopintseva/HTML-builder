const fs = require('fs');
const { stdin } = process;

const folderPath = '02-write-file/';
const fileName = 'text.txt';
const filePath = folderPath + fileName;

fs.open(filePath, 'w', (err) => {
  if (err) throw err;
  console.log('Greetings! Enter text');

  stdin.on('data', (input) => {
    const text = input.toString().trim();
    fs.appendFile(filePath, text + ' ', (err) => {
      if (err) throw err;
      console.log('Text has been added! Enter text.');
    });

    if (text === 'exit') {
      console.log('Input completed. Good job!');
      process.exit();
    }

    process.on('SIGINT', () => {
      console.log('Input completed. Good job!');
      process.exit();
    });
  });
});