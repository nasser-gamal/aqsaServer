import Sequelize from 'sequelize';
import sequelize from '../../config/database.js';


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
});

Role.associate = function (models) {
  Role.hasMany(models.User, {
    onDelete: 'cascade',
  });
};

export default Role;
