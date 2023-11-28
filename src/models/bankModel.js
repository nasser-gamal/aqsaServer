const Sequelize = require('sequelize');
const { sequelize } = require('../config/database.js');
const User = require('./userModel.js');

const Bank = sequelize.define('bank', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  bankName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true, // Added unique constraint
  },
  note: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  isDeleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  deletedAt: {
    type: Sequelize.DATE,
    allowNull: true,
  },
});

User.hasMany(Bank, {
  foreignKey: 'createdBy',
  as: 'creator',
});

Bank.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'creator',
});

User.hasMany(Bank, {
  foreignKey: 'updatedBy',
  as: 'editor',
});

Bank.belongsTo(User, {
  foreignKey: 'updatedBy',
  as: 'editor',
});

module.exports = Bank;
