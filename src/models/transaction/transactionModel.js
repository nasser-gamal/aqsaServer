const Sequelize = require('sequelize');
const sequelize = require('../../config/database.js');

const Transaction = sequelize.define('transaction', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: Sequelize.ENUM('سحب', 'ايداع'),
    allowNull: false,
  },
  date: {
    type: Sequelize.DataTypes.DATE,
    allowNull: false,
  },
  number: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  amount: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  // total Amount
  amountTotal: {
    type: Sequelize.DataTypes.FLOAT(16, 2),
    allowNull: false,
  },
  // رسوم مزو
  providerFees: {
    type: Sequelize.DataTypes.FLOAT(16, 2),
    allowNull: false,
  },
  isPercentage: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
  providerPercentage: {
    type: Sequelize.DataTypes.FLOAT(5, 2),
    allowNull: true,
  },
  // عائد مزود الخدمة
  providerRevenue: {
    type: Sequelize.DataTypes.FLOAT(16, 2),
    allowNull: false,
  },
  // مخصوم مزود
  providerDeduction: {
    type: Sequelize.DataTypes.FLOAT(16, 2),
    allowNull: false,
  },
  // مخصوم من مركز
  agentDeduction: {
    type: Sequelize.DataTypes.FLOAT(16, 2),
    allowNull: true,
  },
  // عائد  مركز
  agentRevenue: {
    type: Sequelize.DataTypes.FLOAT(16, 2),
    allowNull: true,
  },
  // صافي  مخصوم م المركز
  agentTotalDeduction: {
    type: Sequelize.DataTypes.FLOAT(16, 2),
    allowNull: true,
  },
  additionalFees: {
    type: Sequelize.DataTypes.FLOAT(16, 2),
    allowNull: true,
  },
  additionalRevenue: {
    type: Sequelize.DataTypes.FLOAT(16, 2),
    allowNull: true,
  },
  // الربح
  profit: {
    type: Sequelize.DataTypes.FLOAT(16, 2),
    allowNull: false,
  },

  balanceBefore: {
    type: Sequelize.FLOAT(16, 2),
    allowNull: false,
  },
  balanceAfter: {
    type: Sequelize.FLOAT(16, 2),
    allowNull: false,
  },
  
  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  status: {
    type: Sequelize.ENUM('خسارة', 'مكسب', 'لا يوجد ربح'),
    allowNull: false,
  },
  note: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Transaction;
