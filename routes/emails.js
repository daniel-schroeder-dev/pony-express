const express = require('express');
const os = require('os');

const formatResponse = require('../utils/formatResponse');
const getNextEmailId = require('../utils/getNextEmailId');
const parseRequest = require('../utils/parseRequest');

const emails = require('../fixtures/emails');

const router = express.Router();

router.get('/', (req, res, next) => {
  formatResponse(res, emails, 'emails');
});

router.get('/:id', (req, res, next) => {
  const email = emails.find(email => email.id === req.params.id);
  formatResponse(res, email, 'email');
});

router.post('/', async (req, res, next) => {
  const email = await parseRequest(req);
  email.id = getNextEmailId(emails);
  emails.push(email);
  res.status(201).location(`http://${req.headers.host}/emails/${email.id}`).send();
});

module.exports = router;