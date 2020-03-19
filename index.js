const express = require('express');
const { parse } = require('json2csv');
const users = require('./fixtures/users');
const emails = require('./fixtures/emails');

const app = express();

app.get('/users', (req, res, next) => {
  if (req.accepts('text/csv')) {
    const userFields = Object.keys(users[0]);
    const userOpts = { userFields };
    try {
      const csv = parse(users, userOpts);
      return res.send(csv);
    } catch (err) {
      console.error(err);
    }
  }
  res.json(users);
});

app.get('/emails', (req, res, next) => {
  res.json(emails);
});

app.listen(3000, () => {
  console.log('Express app up at 3000.');
});