import Sequelize from 'sequelize';
import sequelize from '../../config/database.js';



const SystemPages = sequelize.define('systemPage', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imgURL: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  pageURL: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  order: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});



export default SystemPages;
