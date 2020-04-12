const express = require('express');

const NotFoundError = require('../errors/NotFoundError');
const formatResponse = require('../utils/formatResponse');

const basicAuth = require('../middleware/basicAuth');

const router = express.Router();

/*
*   Note that a user could be authenticated (meaning they passed in the 
*   correct credentials), but could pass in the :id of another user. In 
*   this case, we would still want to send a NotFoundError, because the 
*   client should be expected to request the correct :id as well as send
*   correct auth credentials.
*/
router.get('/:id', basicAuth, (req, res, next) => {
  if (req.user.id !== req.params.id) throw new NotFoundError('No user found with id: ' + req.params.id);
  formatResponse(res, req.user, 'user');
});

module.exports = router;
