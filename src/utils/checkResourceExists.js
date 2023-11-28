const { NotFoundError } = require('./apiError.js');

exports.checkResourceExists = (resource, errorMessage) => {
  if (!resource) {
    throw new NotFoundError(errorMessage);
  }
  return resource;
};
