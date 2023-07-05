import Sequelize from 'sequelize';
import sequelize from '../../config/database.js';


const PageClaim = sequelize.define('pageClaim', {
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
  }
});

export default PageClaim;
