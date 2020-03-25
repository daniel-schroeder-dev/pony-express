const formatResponse = require('../../utils/formatResponse');
const NotFoundError = require('../../errors/NotFoundError');
const getNextEmailId = require('../../utils/getNextEmailId');

let emails = require('../../fixtures/emails');

const getEmails = (req, res, next) => {
  formatResponse(res, emails, 'emails');
};

const getEmail = (req, res, next) => {
  const email = emails.find(email => email.id === req.params.id);
  if (!email) throw new NotFoundError('No email found with id: ' + req.params.id);
  formatResponse(res, email, 'email');
};

const deleteEmail = (req, res, next) => {
  const emailToDelete = emails.find(email => email.id === req.params.id);
  emails = emails.filter(email => email.id !== req.params.id);
  res.status(200).json(emailToDelete);
};

const postEmail = async (req, res, next) => {
  const email = req.body;
  email.id = getNextEmailId(emails);
  emails.push(email);
  res.status(201).location(`http://${req.headers.host}/emails/${email.id}`).send();
};

const patchEmail = async (req, res, next) => {
  const updatedEmail = req.body;
  const originalEmail = emails.find(email => email.id === req.params.id);
  Object.assign(originalEmail, updatedEmail);
  res.sendStatus(200);
};

module.exports = {
  getEmails,
  getEmail,
  deleteEmail,
  postEmail,
  patchEmail,
};