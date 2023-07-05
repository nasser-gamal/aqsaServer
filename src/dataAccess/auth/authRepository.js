import User from '../../models/auth/userModel.js';

export const getUser = async (query) => {
  try {
    const user = await User.findOne({
      where: query,
    });
    return user;
  } catch (err) {
    throw new Error(err);
  }
};

