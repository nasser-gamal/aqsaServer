import Sequelize from 'sequelize';
import sequelize from '../../config/database.js';

const RolePage = sequelize.define('rolePage', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
});

export default RolePage;
