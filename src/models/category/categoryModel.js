const Sequelize = require('sequelize');
const sequelize = require('../../config/database.js');

const Category = sequelize.define('category', {
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
  imgURL: {
    type: Sequelize.STRING,
    allowNull: true,
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

module.exports =  Category;
