const express = require('express');
const chalk = require('chalk');

const usersRouter = require('./routes/users');
const emailsRouter = require('./routes/emails');

const PORT = process.env.PORT || 3000;
const app = express();

app.use((req, res, next) => {
  const { method, url } = req;
  res.on('finish', () => {
    console.log(formatLogString(method, url, res.statusCode));
  });
  next();
});

const formatLogString = (method, url, statusCode) => {
  method = addColorToMethodString(method);
  statusCode = addColorToStatusCode(statusCode);
  return `${method} ${url} ${statusCode}`;
};

const addColorToMethodString = method => {
  const methodsToColors = {
    'GET': chalk.magentaBright,
    'POST': chalk.greenBright,
    'PATCH': chalk.yellowBright,
    'DELETE': chalk.redBright,
  };
  return methodsToColors[method](method);
};

const addColorToStatusCode = statusCode => {
  if (statusCode <= 299) return chalk.greenBright(statusCode);
  if (statusCode <= 399) return chalk.yellowBright(statusCode);
  if (statusCode <= 499) return chalk.redBright(statusCode);
  return chalk.bgRedBright(statusCode);
};

app.use(express.static('public'));

app.use('/users', usersRouter);
app.use('/emails', emailsRouter);

app.listen(PORT, () => {
  console.log('Express app up at:', PORT);
});
