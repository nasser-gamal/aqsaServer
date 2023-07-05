import Sequelize from 'sequelize';
import sequelize from '../../config/database.js';

const RoleClaim = sequelize.define('roleClaim', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
});

export default RoleClaim;
