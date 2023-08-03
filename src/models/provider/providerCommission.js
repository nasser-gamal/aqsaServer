const Sequelize = require('sequelize');
const sequelize = require('../../config/database.js');

const ProviderCommission = sequelize.define('providerCommission', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  date: {
    type: Sequelize.DataTypes.DATE,
    allowNull: false,
  },
  commission: {
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

module.exports = ProviderCommission;
