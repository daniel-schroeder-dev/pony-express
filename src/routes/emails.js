const express = require('express');
const path = require('path');

const jsonParser = require('body-parser').json();
const upload = require('multer')({ dest: path.join(__dirname, '../../uploads/' )});

const { getEmails, getEmail, deleteEmail, postEmail, patchEmail } = require('./handlers/emails');

const router = express.Router();

router.get('/', getEmails);
router.get('/:id', getEmail);
router.delete('/:id', deleteEmail);
router.post('/', jsonParser, upload.array('attachment'), postEmail);
router.patch('/:id', jsonParser, patchEmail);

module.exports = router;