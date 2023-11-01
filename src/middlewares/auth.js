const BadRequestError = require('../utils/badRequestError.js');
const jwt = require('jsonwebtoken');
const constants = require('../utils/constants.js');

exports.isAuth = (req, res, next) => {
  try {
    console.log(req.headers)
    // const { token } = req.cookies;
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({ message: 'invalid token' });
    }
    const token = authorization.split(' ')[1];
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodeToken) {
      return res.status(401).json({ message: 'invalid token' });
    }
    // const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodeToken;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'invalid token 500' });

    throw new BadRequestError(constants.UNAUTHORIZED, 401);
  }
};

exports.checkUserRole = (requiredRoles) => (req, res, next) => {
  if (requiredRoles.includes(req.user.role.name)) {
    next();
  } else {
    return res.status(401).json({ message: 'invalid token 500' });
    throw new BadRequestError(constants.UNAUTHORIZED, 401);
  }
};
