const fs = require('fs/promises');
const path = require('path');
const filesCopyFolder = path.join(__dirname, 'files-copy');
const filesFolder = path.join(__dirname, 'files');

async function copyDir(sourceDir, destinationDir) {
  try {
    await fs.rm(destinationDir, { recursive: true, force: true });
    await fs.mkdir(destinationDir, { recursive: true });

    console.log('Folder created.');
    const files = await fs.readdir(sourceDir, { withFileTypes: true });
    for (const file of files) {
      const sourceFile = path.join(sourceDir, file.name);
      const copiedFile = path.join(destinationDir, file.name);
      await fs.copyFile(sourceFile, copiedFile);
    }

    console.log('Files were successfully inserted into the files-copy folder.');
  } catch (error) {
    console.error(error);
  }
}

copyDir(filesFolder, filesCopyFolder);
