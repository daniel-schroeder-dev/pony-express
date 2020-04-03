const express = require('express');

const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const formatResponse = require('../utils/formatResponse');

const users = require('../fixtures/users');

const router = express.Router();

const userAuth = (req, res, next) => {
  
  const authHeader = req.get('Authorization');
  
  if (!authHeader || authHeader.split(' ')[0] !== 'Basic') {
    res.set('WWW-Authenticate', 'Basic: realm="Access to user account"');
    throw new UnauthorizedError('Must provide a valid username and password')
  }
  
  const userCredentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString('utf8');
  const [ username, password ] = userCredentials.split(':');
  const user = users.find(user => user.username === username && user.password === password);
  
  if (!user) throw new NotFoundError('No user found with given username and password');

  req.user = user;
  
  next();
};

/*
*   Note that a user could be authenticated (meaning they passed in the 
*   correct credentials), but could pass in the :id of another user. In 
*   this case, we would still want to send a NotFoundError, because the 
*   client should be expected to request the correct :id as well as send
*   correct auth credentials.
*/
router.get('/:id', userAuth, (req, res, next) => {
  if (req.user.id !== req.params.id) throw new NotFoundError('No user found with id: ' + req.params.id);
  formatResponse(res, req.user, 'user');
});

module.exports = router;