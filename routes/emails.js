const express = require('express');
const formatResponse = require('../utils/formatResponse');
const emails = require('../fixtures/emails');

const router = express.Router();

router.get('/', (req, res, next) => {
  formatResponse(res, emails, 'emails');
});

router.get('/:id', (req, res, next) => {
  const email = emails.find(email => email.id === req.params.id);
  formatResponse(res, email, 'email');
});

module.exports = router;