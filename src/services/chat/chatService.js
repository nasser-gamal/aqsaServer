const { Op, useInflection } = require('sequelize');
const chatRepository = require('../../dataAccess/chat/chatRepository');
const BadRequestError = require('../../utils/badRequestError');
const constants = require('../../utils/constants');
const User = require('../../models/userModel');
const Chat = require('../../models/chat/chat');

const isChatExist = async (query) => {
  const chat = await chatRepository.findOne(query);
  if (!chat) throw new NotFoundError(constants.CHAT_NOT_FOUND, 404);
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

exports.getLoggedUserChats = async (userId, queries) => {

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

exports.getChat = async (chatId) => {
  const currentChat = await Chat.findByPk(chatId, {
    include: [
      {
        model: User,
        as: 'members',
        through: {
          attributes: [],
        },
        attributes: ['id', 'userName', 'accountName', 'accountNumber'],
      },
      {
        model: User,
        as: 'owner',
        attributes: ['id', 'userName', 'accountName'],
      },
    ],
  });

  if (!currentChat) throw new NotFoundError(constants.CHAT_NOT_FOUND, 404);

  return currentChat;
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

exports.addMembers = async (currentUser, chatId, userId) => {
  const chat = await chatRepository.findById(chatId, {
    include: [{ model: User, as: 'members' }],
  });
  if (!chat) throw new BadRequestError(constants.CHAT_NOT_FOUND, 404);

  // check if the current user is the owner of the chat
  if (chat.ownerId !== currentUser)
    throw new BadRequestError(constants.CHAT_OWNER, 400);

  // check if the user already member in the Chat Group
  const findMember = chat.members.findIndex((member) => member.id == userId);

  if (findMember >= 0) {
    throw new BadRequestError('هذا المستخدم موجود في المجموعة', 400);
  } else {
    await chat.addMembers(userId);
  }

  return { message: constants.ADD_MEMBERS_TO_CHAT };
};


exports.removeMember = async (currentUser, chatId, userId) => {
  const chat = await chatRepository.findById(chatId);
  if (!chat) throw new BadRequestError(constants.CHAT_NOT_FOUND, 404);

  if (chat.ownerId !== currentUser)
    throw new BadRequestError(constants.CHAT_OWNER, 400);

  await chat.removeMembers(userId);

  return { message: constants.REMOVE_MEMBER_FROM_CHAT };
};
