const express = require('express');
const router = express.Router();

const chatControllers = require('../../controllers/chat/chatController.js');
const links = require('../../links/links.js');
const validate = require('../../utils/validation.js');
const auth = require('../../middlewares/auth.js');
const { checkActive } = require('../../middlewares/checkActive.js');
const {
  creatChatValidate,
} = require('../../utils/validation/chatValidator.js');

router
  .route('/')
  .get(auth.isAuth, checkActive, chatControllers.getLoggedUserChats)
  .post(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin']),
    creatChatValidate,
    chatControllers.addChat
  );

router
  .route('/:chatId')
  .get(auth.isAuth, checkActive, chatControllers.getChat)
  .put(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin']),
    chatControllers.updateChat
  );

module.exports = router;
