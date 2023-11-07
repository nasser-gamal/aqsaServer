const Sequelize = require('sequelize');
const sequelize = require('../../config/database.js');
const User = require('../auth/userModel.js');

const Chat = sequelize.define('chat', {
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
  isGroupChat: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  lastMessageSent: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  lastMessageSentAt: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  avatar: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

// Define the association between Chat and User for the owner
// Chat.belongsTo(User, { as: 'owner' });
Chat.belongsTo(User, {
  onDelete: 'CASCADE',
  foreignKey: 'ownerId',
  targetKey: 'id',
  as: 'owner',
});
User.hasMany(Chat, {
  onDelete: 'CASCADE',
  foreignKey: 'ownerId',
  targetKey: 'id',
  as: 'owner',
});

// Define a many-to-many relationship between Chat and User for chat members
Chat.belongsToMany(User, { through: 'ChatMembers', as: 'members' });
User.belongsToMany(Chat, { through: 'ChatMembers', as: 'chats' });

module.exports = Chat;
