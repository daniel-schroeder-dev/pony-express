const jwt = require('jsonwebtoken');

const users = require('../fixtures/users');
const UnauthorizedError = require('../errors/UnauthorizedError');
const InvalidJWTError = require('../errors/InvalidJWTError');

const bearerAuth = (req, res, next) => {

  const authHeader = req.get('Authorization');
  validateAuthHeader(authHeader, res);
  
  let payload;

  try {
    payload = jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET);
  } catch(e) {
    throw new InvalidJWTError(e);
  }

  req.user = users.find(user => user.id === payload.id);

  next();

};

const validateAuthHeader = (authHeader, res) => {
  if (!authHeader || authHeader.split(' ')[0] !== 'Bearer') {
    res.set('WWW-Authenticate', 'Bearer realm="Access to email server"');
    throw new UnauthorizedError('Must provide valid Bearer authentication credentials');
  }
};

module.exports = bearerAuth;
