const Sequelize = require('sequelize');
const { sequelize } = require('../config/database.js');

const Segment = sequelize.define('segment', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  start: {
    type: Sequelize.DataTypes.FLOAT(16, 2),
    allowNull: false,
  },
  end: {
    type: Sequelize.DataTypes.FLOAT(16, 2),
    allowNull: true,
  },
  percentage: {
    type: Sequelize.DataTypes.FLOAT(5, 2),
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

module.exports = Segment;
