import * as userRepository from '../dataAccess/auth/userRepository.js';
import BadRequestError from '../utils/badRequestError.js';
import constants from '../utils/constants.js';

exports.checkPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const userId = req.user.id;
    const user = await userRepository.findById(userId);

    const matchedPassword = await user.comparePassword(password);

    if (matchedPassword) {
      next();
    } else {
      throw new BadRequestError(constants.PASSWORD_WRONG, 400);
    }
  } catch (err) {
    return next(err);
  }
};
