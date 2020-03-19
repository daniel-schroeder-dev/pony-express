const express = require('express');
const { parse } = require('json2csv');
const js2xmlparser = require('js2xmlparser');

const users = require('./fixtures/users');
const emails = require('./fixtures/emails');

const app = express();

app.get('/users', (req, res, next) => {
  // Note that when the Accept header is '*/*', it will match whatever req.accepts() call you have. So, if you want to return JSON as the default, you have to set it as the first option. The browser (at least Chrome) sends the following Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9. Since the */* is in there, the JSON will get returned instead of the csv or xml.
  if (req.accepts('application/json')) return res.json(users);
  if (req.accepts('text/csv')) {
    return res.type('text/csv').send(convertToCSV(users));
  } 
  if (req.accepts('application/xml')) {
    return res.type('application/xml').send(js2xmlparser.parse('users', users));
  }
});

app.get('/emails', (req, res, next) => {
  if (req.accepts('application/json')) return res.json(emails);
  if (req.accepts('text/csv')) {
    return res.type('text/csv').send(convertToCSV(emails));
  }
  if (req.accepts('application/xml')) {
    return res.type('application/xml').send(js2xmlparser.parse('emails', emails));
  }
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