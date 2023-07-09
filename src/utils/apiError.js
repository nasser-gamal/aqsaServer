class ApiError extends Error {
  constructor(message, statusCode = 404) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = ApiError;
