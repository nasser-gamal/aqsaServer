const User = require('../../models/userModel');

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

