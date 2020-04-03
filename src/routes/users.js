const express = require('express');

const NotFoundError = require('../errors/NotFoundError');
const formatResponse = require('../utils/formatResponse');

const users = require('../fixtures/users');

const router = express.Router();

router.get('/:id', (req, res, next) => {
  const user = users.find(user => user.id === req.params.id);
  if (!user) throw new NotFoundError('No user found with id: ' + req.params.id);
  formatResponse(res, user, 'user');
});

module.exports = router;