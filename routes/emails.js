const express = require('express');
const os = require('os');

const formatResponse = require('../utils/formatResponse');
const getNextEmailId = require('../utils/getNextEmailId');
const parseRequest = require('../utils/parseRequest');

let emails = require('../fixtures/emails');

const router = express.Router();

router.get('/', (req, res, next) => {
  formatResponse(res, emails, 'emails');
});

router.get('/:id', (req, res, next) => {
  const email = emails.find(email => email.id === req.params.id);
  formatResponse(res, email, 'email');
});

router.delete('/:id', (req, res, next) => {
  const emailToDelete = emails.find(email => email.id === req.params.id);
  emails = emails.filter(email => email.id !== req.params.id);
  res.status(200).json(emailToDelete);
});

router.use(async (req, res, next) => {
  req.body = await parseRequest(req);
  next();
});

router.post('/', async (req, res, next) => {
  const email = req.body;
  email.id = getNextEmailId(emails);
  emails.push(email);
  res.status(201).location(`http://${req.headers.host}/emails/${email.id}`).send();
});

router.patch('/:id', async (req, res, next) => {
  const updatedEmail = req.body;
  const originalEmail = emails.find(email => email.id === req.params.id);
  Object.assign(originalEmail, updatedEmail);
  res.sendStatus(200);
});

module.exports = router;