const path = require('path');
const express = require('express');

const defaultErrorHandler = require('./src/middleware/defaultErrorHandler');
const logger = require('./src/middleware/logger');

const usersRouter = require('./src/routes/users');
const emailsRouter = require('./src/routes/emails');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(logger);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/emails', emailsRouter);

app.use(defaultErrorHandler);

app.listen(PORT, () => {
  console.log('Express app up at:', PORT);
});
