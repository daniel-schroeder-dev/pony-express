const express = require('express');

const NotFoundError = require('../errors/NotFoundError');
const formatResponse = require('../utils/formatResponse');

const users = require('../fixtures/users');

const router = express.Router();

const userAuth = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader || authHeader.split(' ')[0] !== 'Basic') {
    res.set('WWW-Authenticate', 'Basic: realm="Access to user account"');
    res.status(401).json({ msg: 'Must provide a valid username and password' });
  } else {
    const userCredentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString('utf8');
    const [ username, password ] = userCredentials.split(':');
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
      res.status(404).json({ msg: 'No user found with given username and password' });
    } else {
      next();
    }
  }
};

router.get('/:id', userAuth, (req, res, next) => {
  const user = users.find(user => user.id === req.params.id);
  if (!user) throw new NotFoundError('No user found with id: ' + req.params.id);
  formatResponse(res, user, 'user');
});

module.exports = router;