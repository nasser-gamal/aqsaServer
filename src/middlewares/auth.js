const jwt = require('jsonwebtoken');
const constants = require('../utils/constants.js');
const { UnAuthorizedError } = require('../utils/apiError.js');
const asyncHandler = require('express-async-handler');
const userRepository = require('../dataAccess/auth/userRepository');

exports.protected = asyncHandler((req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnAuthorizedError(constants.UNAUTHORIZED);
  }
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (!decodeToken) {
    throw new UnAuthorizedError(constants.UNAUTHORIZED);
  }
  req.user = decodeToken;
  next();
});

exports.allowedTo = (requiredRoles) => (req, res, next) => {
  if (requiredRoles.includes(req.user.role.name)) {
    next();
  } else {
    throw new UnAuthorizedError(constants.UNAUTHORIZED);
  }
};


exports.checkActive = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const user = await userRepository.findById(userId);
  if (!user.isActive) {
    throw new UnAuthorizedError(constants.ACCOUNT_NOT_ACTIVE);
  } else {
    next();
  }
});
