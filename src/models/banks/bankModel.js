const Sequelize = require('sequelize');
const sequelize = require('../../config/database.js');

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

module.exports =  Bank;
