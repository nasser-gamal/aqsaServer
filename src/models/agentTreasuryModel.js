const Sequelize = require('sequelize');
const { sequelize } = require('../config/database.js');
const User = require('./userModel.js');
const AddionalTreasury = require('./addionalTreasuryModel.js');

const AgentTreasury = sequelize.define('agentTreasury', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  amount: {
    type: Sequelize.DataTypes.FLOAT(16, 2),
    allowNull: false,
  },
  date: {
    type: Sequelize.DataTypes.DATE,
    allowNull: false,
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





module.exports = AgentTreasury;
