const Sequelize = require('sequelize');
const { sequelize } = require('../../config/database.js');
const Category = require('../categoryModel.js');
const User = require('../userModel.js');
const Segment = require('../segmentsModel.js');
const AgentCommission = require('./agentCommission.js');

const Commission = sequelize.define('commission', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  amountTotal: {
    type: Sequelize.DataTypes.FLOAT(16, 2),
    allowNull: false,
  },
  commissionAmount: {
    type: Sequelize.DataTypes.FLOAT(16, 2),
    allowNull: false,
  },
  totalCount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  note: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  isDeleted: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

AgentCommission.hasMany(Commission, {
  foreignKey: 'agentCommId',
  as: 'commissions',
});

Commission.belongsTo(AgentCommission, {
  foreignKey: 'agentCommId',
  as: 'agentCommission',
});

Commission.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'service',
});

Commission.belongsTo(Segment, {
  foreignKey: 'segmentId',
  as: 'segment',
});

module.exports = Commission;
