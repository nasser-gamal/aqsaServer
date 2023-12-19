const userRepository = require('../dataAccess/auth/userRepository.js');
const constants = require('../utils/constants.js');
const { BadRequestError } = require('../utils/apiError.js');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel.js');

exports.checkPassword = asyncHandler(async (req, res, next) => {
  const { password } = req.body;
  const userId = req.user.id;
  const user = await User.findOne({ where: { id: userId } });

  const matchedPassword = await user.comparePassword(password);

  if (matchedPassword) {
    next();
  } else {
    throw new BadRequestError(constants.PASSWORD_WRONG);
  }
});
