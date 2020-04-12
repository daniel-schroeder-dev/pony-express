const jwt = require('jsonwebtoken');

const users = require('../fixtures/users');
const UnauthorizedError = require('../errors/UnauthorizedError');
const InvalidJWTError = require('../errors/InvalidJWTError');

const bearerAuth = (req, res, next) => {

  const authHeader = req.get('Authorization');
  validateAuthHeader(authHeader, res);

  const id = verifyJWT(authHeader.split(' ')[1]);
  req.user = users.find(user => user.id === id);

  next();

};

const validateAuthHeader = (authHeader, res) => {
  if (!authHeader || authHeader.split(' ')[0] !== 'Bearer') {
    res.set('WWW-Authenticate', 'Bearer realm="Access to email server"');
    throw new UnauthorizedError('Must provide valid Bearer authentication credentials');
  }
};

const verifyJWT = payload => {
  let parsedPayload;
  try {
    parsedPayload = jwt.verify(payload, process.env.JWT_SECRET);
  } catch(e) {
    throw new InvalidJWTError(e);
  }

  return parsedPayload.id;
}


module.exports = bearerAuth;
