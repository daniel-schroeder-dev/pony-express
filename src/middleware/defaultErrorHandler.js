const defaultErrorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  err.statusCode ? res.status(err.statusCode) : res.status(500);
  res.json({ error: err.name, message: err.message });
};

module.exports = defaultErrorHandler;