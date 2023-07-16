const Sequelize = require('sequelize');
const sequelize = require('../../config/database.js');

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
    type: Sequelize.DataTypes.FLOAT(16, 2),
    allowNull: true,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

module.exports = Transfer;
