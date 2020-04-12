const getNextEmailId = emails => {
  return (+emails[emails.length - 1].id + 1).toString();
};

module.exports = getNextEmailId;
