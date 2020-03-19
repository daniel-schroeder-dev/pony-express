const express = require('express');
const users = require('./fixtures/users');
const emails = require('./fixtures/emails');

const app = express();

app.get('/users', (req, res, next) => {
  res.json(users);
});

app.get('/emails', (req, res, next) => {
  res.json(emails);
});

app.listen(3000, () => {
  console.log('Express app up at 3000.');
});