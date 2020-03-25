const express = require('express');

const jsonParser = require('body-parser').json();
const { getEmails, getEmail, deleteEmail, postEmail, patchEmail } = require('./handlers/emails');

const router = express.Router();

router.get('/', getEmails);
router.get('/:id', getEmail);
router.delete('/:id', deleteEmail);
router.post('/', jsonParser, postEmail);
router.patch('/:id', jsonParser, patchEmail);

module.exports = router;