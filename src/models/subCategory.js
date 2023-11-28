const Sequelize = require('sequelize');
const { sequelize } = require('../config/database.js');
const User = require('./userModel');
const Category = require('./categoryModel.js');

const SubCategory = sequelize.define('subCategory', {
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



SubCategory.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'creator',
});

SubCategory.belongsTo(User, {
  foreignKey: 'updatedBy',
  as: 'editor',
});

SubCategory.belongsTo(Category);
Category.hasMany(SubCategory, {
  onDelete: 'CASCADE', 
});

module.exports = SubCategory;
