const Sequelize = require('sequelize');
const { sequelize } = require('../config/database.js');

const Provider = sequelize.define('provider', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
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

module.exports = Provider;
