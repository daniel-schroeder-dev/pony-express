const express = require('express');
const { parse } = require('json2csv');
const js2xmlparser = require('js2xmlparser');

const users = require('./fixtures/users');
const emails = require('./fixtures/emails');

const app = express();

app.get('/users', (req, res, next) => {
  if (req.accepts('text/csv')) {
    return res.type('text/csv').send(convertToCSV(users));
  } 
  if (req.accepts('application/xml')) {
    return res.type('application/xml').send(js2xmlparser.parse('users', users));
  }
  res.json(users);
});

app.get('/emails', (req, res, next) => {
  if (req.accepts('text/csv')) {
    return res.type('text/csv').send(convertToCSV(emails));
  }
  if (req.accepts('application/xml')) {
    return res.type('application/xml').send(js2xmlparser.parse('emails', emails));
  }
  res.json(emails);
});

app.listen(3000, () => {
  console.log('Express app up at 3000.');
});

function convertToCSV(jsonData) {
  const fields = Object.keys(jsonData[0]);
  const opts = { fields };
  try {
    const csv = parse(jsonData, opts);
    return csv;
  } catch (err) {
    console.error(err);
  }
}