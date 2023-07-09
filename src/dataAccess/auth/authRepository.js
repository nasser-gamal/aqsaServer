const User = require('../../models/auth/userModel');

exports.getUser = async (query) => {
  try {
    const user = await User.findOne({
      where: query,
    });
    return user;
  } catch (err) {
    throw new Error(err);
  }
};

