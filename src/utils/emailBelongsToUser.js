const emailBelongsToUser = (email, user) => {
  return user.id === email.to || user.id === email.from;
};

module.exports = emailBelongsToUser;
