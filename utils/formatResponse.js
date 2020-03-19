const convertToCSV = require('../utils/convertToCSV');
const js2xmlparser = require('js2xmlparser');

function formatResponse(res, data, xmlRoot) {
  res.format({
    'application/json': function () {
      res.json(data);
    },

    'text/csv': function () {
      res.send(convertToCSV(data));
    },

    'application/xml': function () {
      res.send(js2xmlparser.parse(xmlRoot, data));
    },
  });
}

module.exports = formatResponse