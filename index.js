if (process.env.NODE_ENV !== 'production') require('dotenv').config();  

const path = require('path');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');

const logger = require('./src/middleware/logger');
const defaultErrorHandler = require('./src/middleware/defaultErrorHandler');
const generateJWT = require('./src/middleware/generateJWT');
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

app.post('/request-token', parseJSON, generateJWT);

app.use(defaultErrorHandler);

app.listen(PORT, () => {
  console.log('Express app up at:', PORT);
});
