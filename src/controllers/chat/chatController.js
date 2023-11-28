const chatServices = require('../../services/chat/chatService');

exports.addChat = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { message } = await chatServices.createChat(userId, req.body);
    return res.status(201).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.getLoggedUserChats = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const usersChats = await chatServices.getLoggedUserChats(userId);
    return res.status(200).json(usersChats);
  } catch (err) {
    return next(err);
  }
};

exports.getChat = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { chatId } = req.params;
    const chat = await chatServices.getChat(userId, chatId);
    return res.status(200).json(chat);
  } catch (err) {
    return next(err);
  }
};

exports.updateChat = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { chatId } = req.params;
    const { message } = await chatServices.updateChat(userId, chatId, req.body);
    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.addNewMember = async (req, res, next) => {
  try {
    const currentUser = req.user.id;
    const { chatId, userId } = req.params;
    const { message } = await chatServices.addMembers(
      currentUser,
      chatId,
      userId
    );
    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.removeMember = async (req, res, next) => {
  try {
    const currentUser = req.user.id;
    const { chatId, userId } = req.params;
    const { message } = await chatServices.removeMember(
      currentUser,
      chatId,
      userId
    );
    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};
