const express = require('express');
const formatResponse = require('../utils/formatResponse');
const users = require('../fixtures/users');

const router = express.Router();

router.get('/', (req, res, next) => {
  formatResponse(res, users, 'users');
});

module.exports = router;