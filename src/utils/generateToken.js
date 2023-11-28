const jwt = require('jsonwebtoken');
const { config } = require('../config/config');

function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    username: user.userName,
    accountName: user.accountName,
    phoneNumber: user.phoneNumber,
    isActive: user.isActive,
    role: user.role,
  };

  const token = jwt.sign(payload, config.jwt.secret);
  const refreshToken = jwt.sign(payload, config.jwt.secret);
  return { token, refreshToken };
}

module.exports = generateToken;
