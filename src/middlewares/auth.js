import BadRequestError from '../utils/badRequestError.js';
import jwt from 'jsonwebtoken';
import constants from '../utils/constants.js';

exports.isAuth = (req, res, next) => {
  try {
    const { token } = req.cookies;
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodeToken;
    next();
  } catch (err) {
    throw new BadRequestError(constants.UNAUTHORIZED, 401);
  }
};

exports.checkUserRole = (requiredRoles) => (req, res, next) => {
  if (requiredRoles.includes(req.user.role.name)) {
    next();
  } else {
    throw new BadRequestError(constants.UNAUTHORIZED, 401);
  }
};
