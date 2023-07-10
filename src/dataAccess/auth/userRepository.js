const { Op } = require('sequelize');
const Role = require('../../models/auth/roleModel');
const User = require('../../models/auth/userModel');

exports.createOne = async (data) => {
  try {
    const user = await User.create(data);
    return user;
  } catch (err) {
    throw new Error(err);
  }
};

exports.updateOne = async (userId, data) => {
  try {
    const user = await User.update(
      {
        ...data,
      },
      { where: { id: userId } }
    );
    return user;
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteOne = async (userId) => {
  try {
    const user = await User.destroy({ where: { id: userId } });

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

exports.isUserExists = async (
  phoneNumber,
  email,
  accountNumber,
  nationalId
) => {
  const whereClause = {
    [Op.or]: [{ phoneNumber }],
  };
  if (accountNumber) {
    whereClause.accountNumber = accountNumber;
  }
  if (nationalId) {
    whereClause.nationalId = nationalId;
  }
  if (email) {
    whereClause.email = email;
  }
  const user = await User.findOne({
    where: whereClause,
  });

  return user;
};

exports.isDataTaken = async (
  userId,
  phoneNumber,
  email,
  accountNumber,
  nationalId
) => {
  try {
    const query = { phoneNumber };
    if (email) {
      query.email = email;
    }
    if (accountNumber) {
      query.accountNumber = accountNumber;
    }
    if (nationalId) {
      query.nationalId = nationalId;
    }

    const user = await User.findOne({
      where: {
        [Op.or]: query,
        id: { [Op.ne]: userId },
      },
    });
    return user; // Return true if a user with the same phone or email is found
  } catch (err) {
    throw new Error(err);
  }
};

exports.findById = async (userId) => {
  try {
    const user = await User.findByPk(userId, {
      include: { model: Role },
    });
    return user;
  } catch (err) {
    throw new Error(err);
  }
};

exports.findAll = async (query) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Role,
          where: query,
        },
      ],
      attributes: { exclude: ['password'] },
    });
    return users;
  } catch (err) {
    throw new Error(err);
  }
};

exports.findOne = async (query) => {
  try {
    const user = await User.findOne({
      where: query,
      attributes: { exclude: ['roleId'] },
      include: { model: Role },
    });
    return user;
  } catch (err) {
    throw new Error(err);
  }
};
