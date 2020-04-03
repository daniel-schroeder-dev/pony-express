const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userAuth = (req, res, next) => {

  const authHeader = req.get('Authorization');
  _parseAuthHeader(authHeader, res);
  req.user = _validateUserCredentials(authHeader);
  
  next();

};

const _parseAuthHeader = (authHeader, res) => {
  if (!authHeader || authHeader.split(' ')[0] !== 'Basic') {
    res.set('WWW-Authenticate', 'Basic: realm="Access to user account"');
    throw new UnauthorizedError('Must provide a valid username and password')
  }
};

const _validateUserCredentials = authHeader => {

  const users = require('../fixtures/users');

  const userCredentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString('utf8');
  const [ username, password ] = userCredentials.split(':');
  const user = users.find(user => user.username === username && user.password === password);
  
  if (!user) throw new NotFoundError('No user found with given username and password');

  return user;

};

module.exports = userAuth;