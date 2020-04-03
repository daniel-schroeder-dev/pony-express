const emailBelongsToUser = (email, userId) => {
  return userId === email.to || userId === email.from;
};

module.exports = emailBelongsToUser;
