const jwt = require('jsonwebtoken');
const users = require('../fixtures/users');
const NotFoundError = require('../errors/NotFoundError');

const generateJWT = (req, res, next) => {

  const { username, password } = req.body;
  const user = users.find(user => user.username === username && user.password === password);

  if (!user) throw new NotFoundError('No user found with given username and password');

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" } );

  res.json({ token });

};

module.exports = generateJWT;
