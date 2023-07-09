const jwt = require('jsonwebtoken')

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

  const token = jwt.sign(payload, process.env.JWT_SECRET);
  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET);
  return { token, refreshToken };
}

module.exports = generateToken;
