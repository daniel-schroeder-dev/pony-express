const express = require('express');
const convertToCSV = require('../utils/convertToCSV');
const js2xmlparser = require('js2xmlparser');
const users = require('../fixtures/users');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.format({
    'application/json': function () {
      res.json(users);
    },

    'text/csv': function () {
      res.send(convertToCSV(users));
    },

    'application/xml': function () {
      res.send(js2xmlparser.parse('users', users));
    },
  });
});

module.exports = router;