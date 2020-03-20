const express = require('express');
const os = require('os');
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
  const email = await parseRequest(req);
  email.id = getNextEmailId(emails);
  emails.push(email);
  res.status(201).location(`http://${req.headers.host}/emails/${email.id}`).send();
});

const parseRequest = req => {
  return new Promise((resolve, reject) => {
    let chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(JSON.parse(Buffer.concat(chunks).toString())));  
  });
}

const getNextEmailId = emails => {
  return (+emails[emails.length - 1].id + 1).toString();
};

module.exports = router;