const express = require('express');

const defaultErrorHandler = require('./middleware/defaultErrorHandler');
const logger = require('./middleware/logger');

const usersRouter = require('./routes/users');
const emailsRouter = require('./routes/emails');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(logger);

app.use(express.static('public'));

app.use('/users', usersRouter);
app.use('/emails', emailsRouter);

app.use(defaultErrorHandler);

app.listen(PORT, () => {
  console.log('Express app up at:', PORT);
});
