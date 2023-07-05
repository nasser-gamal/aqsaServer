import ApiError from './apiError.js';

export const checkResourceExists = (resource, errorMessage) => {
  if (!resource) {
    throw new ApiError(errorMessage);
  }
  return resource;
};
