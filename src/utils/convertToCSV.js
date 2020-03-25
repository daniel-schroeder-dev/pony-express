const { parse } = require('json2csv');

const convertToCSV = (jsonData) => {

  // jsonData could be an array or an object, just need the object to pull the keys out of to populate the 'fields' variable for json2csv's parse() call.
  jsonData = jsonData.length ? jsonData[0] : jsonData;
  
  const fields = Object.keys(jsonData);
  const opts = { fields };
  
  try {
    const csv = parse(jsonData, opts);
    return csv;
  } catch (err) {
    console.error(err);
  }

};

module.exports = convertToCSV;