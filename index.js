const express = require('express');
const chalk = require('chalk');

const usersRouter = require('./routes/users');
const emailsRouter = require('./routes/emails');

const PORT = process.env.PORT || 3000;
const app = express();

app.use((req, res, next) => {
  const { method, url } = req;
  res.on('finish', () => {
    console.log(`${addColorToMethodString(method)} ${url} ${res.statusCode}`);
  });
  next();
});

const formatLogString = (method, url, statusCode) => {
  
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

app.use(express.static('public'));

app.use('/users', usersRouter);
app.use('/emails', emailsRouter);

app.listen(PORT, () => {
  console.log('Express app up at:', PORT);
});
