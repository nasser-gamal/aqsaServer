const authServices = require('../../services/auth/authServices');
const constants = require('../../utils/constants');

exports.login = async (req, res, next) => {
  try {
    const userData = req.body;

    const { user, token } = await authServices.userLogin(userData);

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });

    return res.status(200).json({ user });
  } catch (err) {
    return next(err);
  }
};

exports.logout = (req, res, next) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
    });
    return res.status(200).json({ message: constants.LOGOUT });
  } catch (err) {
    return next(err);
  }
};
