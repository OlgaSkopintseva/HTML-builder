const path = require('path');
const fs = require('fs/promises');
const { createWriteStream, createReadStream } = require('fs');
const distFolder = path.join(__dirname, 'project-dist');
const stylesFolder = path.join(__dirname, 'styles');
const componentFolder = path.join(__dirname, 'components');
const templateHTML = path.join(__dirname, 'template.html');
const styleCSS = path.join(__dirname, 'project-dist', 'style.css');

async function createFolder() {
  try {
    await fs.rm(distFolder, { recursive: true, force: true });
    fs.mkdir(distFolder, { recursive: true });
    copyDir(path.join(__dirname, 'assets'), path.join(distFolder, 'assets'));
    createCSS();
    buildHTML();
  } catch (err) {
    console.log(err);
  }
}

async function copyDir(sourceDir, destinationDir) {
  await fs.mkdir(destinationDir, { recursive: true });
  const elements = await fs.readdir(sourceDir, { withFileTypes: true });
  elements.forEach((element) => {
    const sourceFile = path.join(sourceDir, element.name);
    const copiedFile = path.join(destinationDir, element.name);
    if (element.isDirectory()) {
      copyDir(sourceFile, copiedFile);
    } else {
      fs.copyFile(sourceFile, copiedFile);
    }
  });
}

async function buildHTML() {
  try {
    let html = await fs.readFile(templateHTML, 'utf8');
    const templates = [...html.matchAll(/{{(.*)}}/g)];
    for (const template in templates) {
      const replacePath = path.join(
        componentFolder,
        `${templates[template][1]}.html`,
      );
      const replaceHTML = await fs.readFile(replacePath, 'utf8');
      html = html.replace(templates[template][0], replaceHTML);
    }
    await fs.writeFile(path.join(distFolder, 'index.html'), html, 'utf8');
  } catch (err) {
    console.log(err);
  }
}

async function createCSS() {
  try {
    const output = createWriteStream(styleCSS);
    const files = await fs.readdir(stylesFolder, { withFileTypes: true });

    for (const file of files) {
      if (file.isFile() && file.name.endsWith('.css')) {
        const input = createReadStream(
          path.join(stylesFolder, file.name),
          'utf-8',
        );
        input.pipe(output);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

createFolder();
