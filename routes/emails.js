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

router.post('/', async (req, res, next) => {
  const body = await parseRequest(req);
  emails.push(body);
  res.status(201).location('/emails/').send();
});

const parseRequest = req => {
  return new Promise((resolve, reject) => {
    let chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(JSON.parse(Buffer.concat(chunks).toString())));  
  });
}

module.exports = router;