const express = require('express');
const router = express.Router();

const chatControllers = require('../../controllers/chat/chatController.js');
const { protected, allowedTo, checkActive } = require('../../middlewares/auth');

const { creatChatValidate } = require('../../validator/chatValidator');

router
  .route('/')
  .get(protected, checkActive, chatControllers.getLoggedUserChats)
  .post(
    protected,
    checkActive,
    allowedTo(['superAdmin']),
    creatChatValidate,
    chatControllers.addChat
  );

router
  .route('/:chatId')
  .get(protected, checkActive, chatControllers.getChat)
  .put(
    protected,
    checkActive,
    allowedTo(['superAdmin']),
    chatControllers.updateChat
  );

router
  .route('/:chatId/members/:userId')
  .post(
    protected,
    checkActive,
    allowedTo(['superAdmin']),
    chatControllers.addNewMember
  )
  .delete(
    protected,
    checkActive,
    allowedTo(['superAdmin']),
    chatControllers.removeMember
  );

module.exports = router;
