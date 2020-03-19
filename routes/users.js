const express = require('express');
const users = require('../fixtures/users');
const formatResponse = require('../utils/formatResponse');

const router = express.Router();

router.get('/', (req, res, next) => {
  formatResponse(res, users, 'users');
});

module.exports = router;