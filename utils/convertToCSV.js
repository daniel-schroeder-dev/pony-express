const { parse } = require('json2csv');

const convertToCSV = (jsonData) => {
  const fields = Object.keys(jsonData[0]);
  const opts = { fields };
  try {
    const csv = parse(jsonData, opts);
    return csv;
  } catch (err) {
    console.error(err);
  }
};

module.exports = convertToCSV;