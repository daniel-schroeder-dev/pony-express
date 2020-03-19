const express = require('express');
const usersRouter = require('./routes/users');
const emailsRouter = require('./routes/emails');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('public'));

app.use('/users', usersRouter);
app.use('/emails', emailsRouter);

app.listen(PORT, () => {
  console.log('Express app up at:', PORT);
});
