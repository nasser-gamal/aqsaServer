const Sequelize = require('sequelize');
const sequelize = require('../../config/database.js');
const User = require('../auth/userModel.js');
const Chat = require('../chat/chat.js');

const Message = sequelize.define('message', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  replyTo: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});


// Define the association between Message and User for the sender
Message.belongsTo(User, { as: 'sender' });

// Define the association between Message and Chat for the chat it belongs to
Message.belongsTo(Chat, { as: 'chat' });

// Define a many-to-many relationship between Message and User for readBy
Message.belongsToMany(User, { through: 'MessageReadBy', as: 'readBy' });

module.exports = Message;
