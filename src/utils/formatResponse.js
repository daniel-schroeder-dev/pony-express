const convertToCSV = require('../utils/convertToCSV');
const js2xmlparser = require('js2xmlparser');

const formatResponse = (res, data, xmlRoot) => {
  res.format({
    'application/json': () => res.json(data),
    'text/csv': () => res.send(convertToCSV(data)),
    'application/xml': () => res.send(js2xmlparser.parse(xmlRoot, data)),
    'default': () => res.json(data),
  });
};

module.exports = formatResponse