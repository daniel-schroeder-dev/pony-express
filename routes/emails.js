const express = require('express');
const emails = require('../fixtures/emails');
const formatResponse = require('../utils/formatResponse');

const router = express.Router();

router.get('/', (req, res, next) => {
  formatResponse(res, emails, 'emails');
});

module.exports = router;