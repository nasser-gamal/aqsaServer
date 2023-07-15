const Sequelize = require('sequelize');
const sequelize = require('../../config/database.js');

const Category = sequelize.define(
  'category',
  {
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
      type: Sequelize.DataTypes.DATE(),
      allowNull: true,
      defaultValue: new Date(),
      // This way, the current date/time will be used to populate this column (at the moment of insertion)
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Category;
