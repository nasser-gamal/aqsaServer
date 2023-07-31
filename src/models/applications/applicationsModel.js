const Sequelize = require('sequelize');
const sequelize = require('../../config/database.js');

const Application = sequelize.define('application', {
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
  img: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  isLink: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  link: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  apk: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  note: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Application;
