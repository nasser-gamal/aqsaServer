const Sequelize = require('sequelize');
const sequelize = require('../../config/database.js');

const Treasury = sequelize.define('treasury', {
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
});

module.exports =   Treasury;
