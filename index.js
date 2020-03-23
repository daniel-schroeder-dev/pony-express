const express = require('express');

const logger = require('./middleware/logger');

const usersRouter = require('./routes/users');
const emailsRouter = require('./routes/emails');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(logger);

app.use(express.static('public'));

app.use('/users', usersRouter);
app.use('/emails', emailsRouter);

app.use(errorHandler);

function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500).json({ error: err.name, message: err.message });
}

app.listen(PORT, () => {
  console.log('Express app up at:', PORT);
});
