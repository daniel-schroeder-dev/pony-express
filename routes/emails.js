const express = require('express');
const formatResponse = require('../utils/formatResponse');
const emails = require('../fixtures/emails');

const router = express.Router();

router.get('/', (req, res, next) => {
  formatResponse(res, emails, 'emails');
});

module.exports = router;