const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, '../dist/ez-api');

fs.readdir(directory, (error, files) => {
  if (error) {
    console.error('Could not list the directory.', error);
    process.exit(1);
  }

  files.forEach((file) => {
    const filePath = path.join(directory, file);
    fs.stat(filePath, (error, stat) => {
      if (error) {
        console.error('Error stating file: ', error);
        return;
      }

      console.log(`${file}: ${(stat.size / 1024).toFixed(2)} KB`);
    });
  });
});
