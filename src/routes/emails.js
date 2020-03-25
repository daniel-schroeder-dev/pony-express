const express = require('express');

const jsonBodyParser = require('../middleware/jsonBodyParser');
const { getEmails, getEmail, deleteEmail, postEmail, patchEmail } = require('./handlers/emails');

const router = express.Router();

router.get('/', getEmails);
router.get('/:id', getEmail);
router.delete('/:id', deleteEmail);
router.post('/', jsonBodyParser, postEmail);
router.patch('/:id', jsonBodyParser, patchEmail);

module.exports = router;