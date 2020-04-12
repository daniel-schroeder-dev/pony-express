const users = require('../fixtures/users');

const bearerAuth = (req, res, next) => {
  

  // req.user = users.find(user => user.email)
  next();
};

module.exports = bearerAuth;
