const userRepository = require('../dataAccess/auth/userRepository.js');
const constants = require('../utils/constants.js');
const { BadRequestError } = require('../utils/apiError.js');
const asyncHandler = require('express-async-handler');

exports.checkPassword = asyncHandler(async (req, res, next) => {
  const { password } = req.body;
  const userId = req.user.id;
  const user = await userRepository.findById(userId);

  const matchedPassword = await user.comparePassword(password);

  if (matchedPassword) {
    next();
  } else {
    throw new BadRequestError(constants.PASSWORD_WRONG);
  }
});
