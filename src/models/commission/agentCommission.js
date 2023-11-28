const Sequelize = require('sequelize');
const { sequelize } = require('../../config/database.js');
const Category = require('../categoryModel.js');
const User = require('../userModel.js');
const Segment = require('../segmentsModel.js');
const Commission = require('./commissionModel.js');

const AgentCommission = sequelize.define('agentCommission', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  month: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  year: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  amountTotal: {
    type: Sequelize.DataTypes.FLOAT(16, 2),
    allowNull: true,
  },
  commissionAmount: {
    type: Sequelize.DataTypes.FLOAT(16, 2),
    allowNull: true,
  },
  totalCount: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  note: {
    type: Sequelize.STRING,
    allowNull: true,
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

AgentCommission.belongsTo(User, {
  foreignKey: 'updatedBy',
  as: 'updator',
});

User.hasMany(AgentCommission, {
  foreignKey: 'agentId',
  as: 'agentCommissions',
});
AgentCommission.belongsTo(User, {
  foreignKey: 'agentId',
  as: 'agent',
});

User.hasMany(AgentCommission, {
  foreignKey: 'createdBy',
  as: 'commissions',
});

AgentCommission.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'creator', // or any other unique alias
});

module.exports = AgentCommission;
