const ApiError = require('./apiError.js');

exports.checkResourceExists = (resource, errorMessage) => {
  if (!resource) {
    throw new ApiError(errorMessage);
  }
  return resource;
};
