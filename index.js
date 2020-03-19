const express = require('express');
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

