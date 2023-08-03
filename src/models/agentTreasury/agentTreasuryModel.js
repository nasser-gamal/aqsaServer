const Sequelize = require('sequelize');
const sequelize = require('../../config/database.js');

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
});

module.exports = AgentTreasury;
