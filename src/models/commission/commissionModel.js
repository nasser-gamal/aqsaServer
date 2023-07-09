const Sequelize = require('sequelize');
const sequelize = require('../../config/database.js');

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
  commission: {
    type: Sequelize.DataTypes.FLOAT(16, 2),
    allowNull: false,
  },
  count: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
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
});

module.exports =  Commission;
