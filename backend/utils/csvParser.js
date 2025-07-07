const fs = require('fs');
const parse = require('csv-parse');

async function parseCsvFile(filePath) {
  return new Promise((resolve, reject) => {
    const records = [];

    fs.createReadStream(filePath)
      .pipe(parse({
        columns: true,        // ヘッダー行をキーにする
        skip_empty_lines: true
      }))
      .on('data', (row) => {
        records.push(row);
      })
      .on('end', () => {
        resolve(records);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

module.exports = parseCsvFile;
