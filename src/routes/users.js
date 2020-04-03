const express = require('express');

const NotFoundError = require('../errors/NotFoundError');
const formatResponse = require('../utils/formatResponse');

const users = require('../fixtures/users');

const router = express.Router();

const userAuth = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    res.set('WWW-Authenticate', 'Basic: realm="Access to user account"');
    res.status(401).json({ msg: 'Must provide a valid username and password' });
  } else {
    next();
  }
};

router.get('/:id', userAuth, (req, res, next) => {
  const user = users.find(user => user.id === req.params.id);
  if (!user) throw new NotFoundError('No user found with id: ' + req.params.id);
  formatResponse(res, user, 'user');
});

module.exports = router;