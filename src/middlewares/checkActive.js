const userRepository = require('../dataAccess/auth/userRepository.js');
const constants = require('../utils/constants.js');
const BadRequestError = require('../utils/badRequestError.js');

exports.checkActive = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await userRepository.findById(userId);

    if (!user.isActive) {
      throw new BadRequestError(constants.ACCOUNT_NOT_ACTIVE, 401);
    }
    next();
  } catch (err) {
    return next(err);
  }
};
