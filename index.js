const express = require('express');
const { parse } = require('json2csv');
const js2xmlparser = require('js2xmlparser');

const usersRouter = require('./routes/users');
const emails = require('./fixtures/emails');

const app = express();

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

app.use('/users', usersRouter);

app.get('/emails', (req, res, next) => {
  if (req.accepts('application/json')) return res.json(emails);
  if (req.accepts('text/csv')) {
    return res.type('text/csv').send(convertToCSV(emails));
  }
  if (req.accepts('application/xml')) {
    return res.type('application/xml').send(js2xmlparser.parse('emails', emails));
  }
});

app.listen(PORT, () => {
  console.log('Express app up at:', PORT);
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