const { Op } = require('sequelize');
const chatRepository = require('../../dataAccess/chat/chatRepository');
const BadRequestError = require('../../utils/badRequestError');
const constants = require('../../utils/constants');
const User = require('../../models/auth/userModel');
const Chat = require('../../models/chat/chat');

const isChatExist = async (query) => {
  const chat = await chatRepository.findOne(query);
  return chat;
};

exports.createChat = async (userId, body) => {
  const { name, isGroupChat, description, users } = body;

  // check if the chat name is exist in DB
  const chatExistance = await isChatExist({ name });
  if (chatExistance) {
    throw new BadRequestError(constants.CHAT_EXIST, 400);
  }
  const chat = await chatRepository.createOne({
    name,
    isGroupChat,
    description,
    ownerId: userId,
  });

  await chat.addMembers([userId, ...users]);

  return { message: constants.CREATE_CHAT };
};

exports.getLoggedUserChats = async (userId) => {
  const userChats = await User.findByPk(userId, {
    include: [
      {
        model: Chat,
        as: 'chats',
        through: {
          attributes: [], // Exclude all attributes from the join table
        },
        include: [
          {
            model: User, // Include the User model
            as: 'members',
            through: {
              attributes: [], // Exclude all attributes from the join table
            },
            attributes: [
              'id',
              'userName',
              'accountName',
              'email',
              'phoneNumber',
            ],
          },
          {
            model: User,
            as: 'owner',
            attributes: [
              'id',
              'userName',
              'accountName',
              'email',
              'phoneNumber',
            ],
          },
        ],
      },
    ],
  });

  const chats = userChats.chats.map((chat) => {
    const numberOfMembers = chat.members.length;

    // Create a new object with the chat attributes and the number of members
    return {
      ...chat.toJSON(), // Extract chat attributes
      numberOfMembers, // Include the number of members
    };
  });
  return chats;
};

exports.getChat = async (userId, chatId) => {
  const currentChat = await User.findByPk(userId, {
    include: [
      {
        model: Chat,
        where: {
          id: chatId,
        },
        as: 'chats',
        through: {
          attributes: [], // Exclude all attributes from the join table
        },

        include: [
          {
            model: User, // Include the User model
            as: 'members',
            through: {
              attributes: [], // Exclude all attributes from the join table
            },
            attributes: [
              'id',
              'userName',
              'accountName',
              'email',
              'phoneNumber',
            ],
          },
          {
            model: User,
            as: 'owner',
            attributes: [
              'id',
              'userName',
              'accountName',
              'email',
              'phoneNumber',
            ],
          },
        ],
      },
    ],
  });

  if (!currentChat) throw new BadRequestError(constants.CHAT_NOT_FOUND, 404);

  const chats = currentChat.chats.map((chat) => {
    const numberOfMembers = chat.members.length;

    // Create a new object with the chat attributes and the number of members
    return {
      ...chat.toJSON(), // Extract chat attributes
      numberOfMembers, // Include the number of members
    };
  });
  return chats;
};

exports.updateChat = async (userId, chatId, body) => {
  const { name, description } = body;

  const chat = await chatRepository.findById(chatId);
  if (!chat) throw new BadRequestError(constants.CHAT_NOT_FOUND, 404);

  // check if the chat name is exist in DB
  const chatExistance = await isChatExist({
    [Op.and]: {
      id: { [Op.ne]: chatId },
      ownerId: { [Op.ne]: userId },
      name,
    },
  });

  if (chatExistance) {
    throw new BadRequestError(constants.CHAT_EXIST, 400);
  }

  // check if the current user is the owner of the chat
  if (chat.ownerId !== userId)
    throw new BadRequestError(constants.CHAT_OWNER, 400);

  await chatRepository.updateOne(chatId, {
    name,
    description,
  });

  return { message: constants.UPDATE_CHAT };
};

exports.addMembers = async (userId, chatId, body) => {
  const chat = await chatRepository.findById(chatId);
  if (!chat) throw new BadRequestError(constants.CHAT_NOT_FOUND, 404);

  // check if the current user is the owner of the chat
  if (chat.ownerId !== userId)
    throw new BadRequestError(constants.CHAT_OWNER, 400);

  await chat.addMembers(body.users);

  return { message: constants.ADD_MEMBERS_TO_CHAT };
};

exports.removeMember = async (userId, chatId, body) => {
  const chat = await chatRepository.findById(chatId);
  if (!chat) throw new BadRequestError(constants.CHAT_NOT_FOUND, 404);

  if (chat.ownerId !== userId)
    throw new BadRequestError(constants.CHAT_OWNER, 400);

  await chat.addMembers(users);

  return { message: constants.ADD_MEMBERS_TO_CHAT };
};
