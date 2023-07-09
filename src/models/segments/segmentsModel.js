const Sequelize = require('sequelize');
const sequelize = require('../../config/database.js');

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
});

module.exports =   Segment;
