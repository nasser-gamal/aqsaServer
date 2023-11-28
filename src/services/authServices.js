const asyncHandler = require('express-async-handler');
const constants = require('../utils/constants.js');
const { BadRequestError } = require('../utils/apiError.js');
const generateToken = require('../utils/generateToken.js');
const User = require('../models/userModel.js');
const { Role } = require('../models/index.js');

const checkPhoneNumber = async (phoneNumber) => {
  const user = await User.findOne({
    where: { phoneNumber },
    include: [{ model: Role, attributes: ['id', 'name'] }],
  });

  if (!user) {
    throw new BadRequestError(constants.LOGIN_WRONG, 400);
  }
  return user;
};

const comparePassword = async (user, password) => {
  const matchPassword = await user.comparePassword(password);

  if (!matchPassword) {
    throw new BadRequestError(constants.LOGIN_WRONG, 400);
  }

  return matchPassword;
};

exports.userLogin = asyncHandler(async (userData) => {
  const { phoneNumber, password } = userData;

  const user = await checkPhoneNumber(phoneNumber);

  if (!user.isActive) {
    throw new BadRequestError(constants.ACCOUNT_NOT_ACTIVE, 400);
  }

  await comparePassword(user, password);

  const { token, refreshToken } = generateToken(user);

  const _user = {
    id: user.id,
    userName: user.userName,
    accountName: user.accountName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    address: user.address,
    accountNumber: user.accountNumber,
    nationalId: user.nationalId,
    isActive: user.isActive,
    role: user.role,
  };

  return { user: _user, token, refreshToken };
});
