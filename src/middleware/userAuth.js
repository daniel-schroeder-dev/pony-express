const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const users = require('../fixtures/users');

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

module.exports = userAuth;
