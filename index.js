const path = require('path');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');

const defaultErrorHandler = require('./src/middleware/defaultErrorHandler');
const logger = require('./src/middleware/logger');
const parseJSON = bodyParser.json();

const usersRouter = require('./src/routes/users');
const emailsRouter = require('./src/routes/emails');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(logger);
app.use(compression());

app.use(express.static(path.join(__dirname, 'public/')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads/')));

app.use('/users', usersRouter);
app.use('/emails', emailsRouter);

app.post('/request-token', parseJSON, (req, res, next) => {

  const users = require('./src/fixtures/users');
  const { username, password } = req.body;

  const user = users.find(user => user.username === username && user.password === password);

  if (!user) throw new NotFoundError('No user found with given username and password');

  res.json({ jwt: 'token' });

});

app.use(defaultErrorHandler);

app.listen(PORT, () => {
  console.log('Express app up at:', PORT);
});
