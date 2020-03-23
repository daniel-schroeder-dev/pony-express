const express = require('express');
const formatResponse = require('../utils/formatResponse');
const users = require('../fixtures/users');

const router = express.Router();

router.get('/', (req, res, next) => {
  formatResponse(res, users, 'users');
});

router.get('/:id', (req, res, next) => {
  const user = users.find(user => user.id === req.params.id);
  if (!user) throw new Error('No user found with id', req.params.id);
  formatResponse(res, user, 'user');
});

module.exports = router;