const Sequelize = require('sequelize');
const sequelize = require('../../config/database.js');

import bcrypt from 'bcrypt';

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  accountName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  accountNumber: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  nationalId: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  resetPasswordCode: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  passwordCodeExpiration: {
    type: Sequelize.DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = User;

// Hash Password Before Create
User.beforeCreate(async (user, options) => {
  const hashPassword = await bcrypt.hash(user.password, 12);
  user.password = hashPassword;
});
// Hash Password function to hash update password
User.prototype.hashPassword = async function (password) {
  return await bcrypt.hash(password, 12);
};
// compare Password
User.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
