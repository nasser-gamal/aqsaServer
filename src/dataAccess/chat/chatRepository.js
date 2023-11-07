const Chat = require('../../models/chat/chat');

exports.createOne = async (data) => {
  try {
    const chat = await Chat.create(data);
    return chat;
  } catch (err) {
    throw new Error(err);
  }
};

exports.updateOne = async (chatId, data) => {
  try {
    const chat = await Chat.update(
      {
        ...data,
      },
      { where: { id: chatId } }
    );
    return chat;
  } catch (err) {
    throw new Error(err);
  }
};

exports.findAll = async () => {
  try {
    const chats = await Chat.findAll();
    return chats;
  } catch (err) {
    throw new Error(err);
  }
};

exports.findOne = async (query) => {
  try {
    const chat = await Chat.findOne({ where: query });
    return chat;
  } catch (err) {
    throw new Error(err);
  }
};

exports.findById = async (chatId, query) => {
  try {
    const chat = await Chat.findByPk(chatId, query);
    return chat;
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteOne = async (chatId) => {
  try {
    const chat = await Chat.destroy({
      where: { id: chatId },
    });
    return chat;
  } catch (err) {
    throw new Error(err);
  }
};
