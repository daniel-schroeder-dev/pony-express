const express = require('express');
const convertToCSV = require('../utils/convertToCSV');
const js2xmlparser = require('js2xmlparser');
const emails = require('../fixtures/emails');

const router = express.Router();

router.get('/', (req, res, next) => {
  if (req.accepts('application/json')) return res.json(emails);
  if (req.accepts('text/csv')) {
    return res.type('text/csv').send(convertToCSV(emails));
  }
  if (req.accepts('application/xml')) {
    return res.type('application/xml').send(js2xmlparser.parse('emails', emails));
  }
});

module.exports = router;