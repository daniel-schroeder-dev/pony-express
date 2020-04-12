const express = require('express');
const path = require('path');

const jsonParser = require('body-parser').json();
const urlEncodedParser = require('body-parser').urlencoded({ extended: true });
const upload = require('multer')({ dest: path.join(__dirname, '../../uploads/' )});

// const basicAuth = require('../middleware/basicAuth');

const { getEmails, getEmail, deleteEmail, postEmail, patchEmail } = require('./handlers/emails');

const router = express.Router();

const parseResponseBodyMiddlewareSubStack = [
  urlEncodedParser, 
  jsonParser, 
  upload.array('attachment'),
];

// router.use(basicAuth);

router.route('/')
  .get(getEmails)
  .post(parseResponseBodyMiddlewareSubStack, postEmail);

router.route('/:id')
  .get(getEmail)
  .delete(deleteEmail)
  .patch(parseResponseBodyMiddlewareSubStack, patchEmail)

module.exports = router;