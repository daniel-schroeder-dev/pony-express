const express = require('express');
const path = require('path');

const jsonParser = require('body-parser').json();
const urlEncodedParser = require('body-parser').urlencoded({ extended: true });
const upload = require('multer')({ dest: path.join(__dirname, '../../uploads/' )});

const { getEmails, getEmail, deleteEmail, postEmail, patchEmail } = require('./handlers/emails');

const router = express.Router();

const parseResponseBodyMiddlewareSubStack = [
  urlEncodedParser, 
  jsonParser, 
  upload.array('attachment'),
];

router.get('/', getEmails);
router.get('/:id', getEmail);
router.delete('/:id', deleteEmail);
router.post('/', parseResponseBodyMiddlewareSubStack, postEmail);
router.patch('/:id', parseResponseBodyMiddlewareSubStack, patchEmail);

module.exports = router;