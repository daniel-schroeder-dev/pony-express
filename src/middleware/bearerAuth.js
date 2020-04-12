const users = require('../fixtures/users');
const UnauthorizedError = require('../errors/UnauthorizedError');

const bearerAuth = (req, res, next) => {

  validateAuthHeader(req.get('Authorization'), res);

  // req.user = users.find(user => user.email)
  next();
};

const validateAuthHeader = (authHeader, res) => {
  if (!authHeader || authHeader.split(' ')[0] !== 'Bearer') {
    res.set('WWW-Authenticate', 'Bearer realm="Access to email server"');
    throw new UnauthorizedError('Must provide valid Bearer authentication credentials');
  }
};

module.exports = bearerAuth;
