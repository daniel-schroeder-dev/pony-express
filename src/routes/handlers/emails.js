const formatResponse = require('../../utils/formatResponse');
const NotFoundError = require('../../errors/NotFoundError');
const ForbiddenError = require('../../errors/ForbiddenError');
const getNextEmailId = require('../../utils/getNextEmailId');
const formatAttachments = require('../../utils/formatAttachments');
const emailBelongsToUser = require('../../utils/emailBelongsToUser');

let emails = require('../../fixtures/emails');

/*
*   The client will be responsible for sorting emails into sent/recieved 
*   categories, we only send back emails associated with the user.
*/
const getEmails = (req, res, next) => {
  const userEmails = emails.filter(email => email.to === req.user.id || email.from === req.user.id);
  formatResponse(res, userEmails, 'emails');
};

const getEmail = (req, res, next) => {
  let email = emails.find(email => email.id === req.params.id);
  if (!email) throw new NotFoundError('No email found for this user with id: ' + req.params.id);
  if (!emailBelongsToUser(email, req.user)) throw new ForbiddenError('You do not have permission to GET this email');
  formatResponse(res, email, 'email');
};

const deleteEmail = (req, res, next) => {
  const emailToDelete = emails.find(email => email.id === req.params.id);
  if (!emailBelongsToUser(emailToDelete, req.user)) throw new ForbiddenError('You do not have permission to DELETE this email');
  emails = emails.filter(email => email.id !== req.params.id);
  res.status(200).json(emailToDelete);
};

const postEmail = (req, res, next) => {
  const email = req.body;
  if (email.from !== req.user.id) throw new ForbiddenError('Malformed email, field {from} doesn\'t match user id');
  email.attachments = formatAttachments(req.files);
  email.id = getNextEmailId(emails);
  emails.push(email);
  res.status(201).location(`http://${req.headers.host}/emails/${email.id}`).send();
};

const patchEmail = (req, res, next) => {
  const updatedEmail = req.body;
  updatedEmail.attachments = formatAttachments(req.files);
  const oldEmail = emails.find(email => email.id === req.params.id);
  Object.assign(oldEmail, updatedEmail);
  res.sendStatus(200);
};

module.exports = {
  getEmails,
  getEmail,
  deleteEmail,
  postEmail,
  patchEmail,
};