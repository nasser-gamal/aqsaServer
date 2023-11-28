const Sequelize = require('sequelize');
const { sequelize } = require('../config/database.js');

const Transfer = sequelize.define('transfer', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: Sequelize.ENUM('تسوية', 'تحويل'),
    allowNull: false,
    defaultValue: 'تسوية',
  },
  amountTotal: {
    type: Sequelize.DataTypes.FLOAT(16, 2),
    allowNull: false,
  },
  balanceSenderBefore: {
    type: Sequelize.FLOAT(16, 2),
    allowNull: false,
  },
  balanceSenderAfter: {
    type: Sequelize.FLOAT(16, 2),
    allowNull: false,
  },
  balanceRecipientBefore: {
    type: Sequelize.FLOAT(16, 2),
    allowNull: false,
  },
  balanceRecipientAfter: {
    type: Sequelize.FLOAT(16, 2),
    allowNull: false,
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

module.exports = Transfer;
