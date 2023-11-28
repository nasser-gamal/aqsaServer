const Sequelize = require('sequelize');
const { sequelize } = require('../config/database.js');

const Role = sequelize.define('role', {
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
  nameAr: {
    type: Sequelize.STRING,
    allowNull: false,
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

Role.associate = function (models) {
  Role.hasMany(models.User, {
    onDelete: 'cascade',
  });
};

module.exports = Role;
