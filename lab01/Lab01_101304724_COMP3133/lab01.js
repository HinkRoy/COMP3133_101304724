const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const inputFile = path.join(__dirname, 'input_countries.csv');
const outputCanada = path.join(__dirname, 'canada.txt');
const outputUSA = path.join(__dirname, 'usa.txt');

console.log(`Reading CSV file from ${inputFile}`);

// Delete existing files
[outputCanada, outputUSA].forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`Deleting existing file: ${file}`);
    fs.unlinkSync(file);
  }
});

// Process CSV
fs.createReadStream(inputFile)
  .pipe(csv())
  .on('data', (row) => {
    console.log("Row read from CSV:", row);
    if (row.country === 'Canada') {
      console.log("Writing row to Canada file:", row);
      fs.appendFileSync(outputCanada, JSON.stringify(row) + '\n');
    } else if (row.country === 'United States') {
      console.log("Writing row to USA file:", row);
      fs.appendFileSync(outputUSA, JSON.stringify(row) + '\n');
    }
  })
  .on('end', () => {
    console.log('CSV file processed.');
  })
  .on('error', (err) => {
    console.error('Error reading CSV file:', err);
  });
