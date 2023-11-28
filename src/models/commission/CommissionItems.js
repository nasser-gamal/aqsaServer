const Sequelize = require('sequelize');
const { sequelize } = require('../../config/database.js');
const SubCategory = require('../subCategory');
const Commission = require('./commissionModel');

const CommissionItems = sequelize.define('commissionItems', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  amount: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  count: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

SubCategory.hasMany(CommissionItems, {
  foreignKey: 'subCategoryId',
  as: 'commissionItems',
});

CommissionItems.belongsTo(SubCategory, {
  foreignKey: 'subCategoryId',
  as: 'subCategory',
});

Commission.hasMany(CommissionItems, {
  foreignKey: 'commissionId',
  as: 'commissionItems',
});

CommissionItems.belongsTo(Commission, {
  foreignKey: 'commissionId',
  as: 'commission',
});

module.exports = CommissionItems;
