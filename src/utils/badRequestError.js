class BadRequestError extends Error {
  constructor(message, statusCode = 422) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = BadRequestError;
