class InvalidJWTError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidJWTError';
    this.statusCode = 401;
  }
}

module.exports = InvalidJWTError;
