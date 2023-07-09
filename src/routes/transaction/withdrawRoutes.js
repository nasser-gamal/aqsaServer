const express = require('express');
const router = express.Router();

const withdrawControllers = require('../../controllers/transaction/withdrawControllers.js');
const links = require('../../links/links.js');
const validate = require('../../utils/validation.js');
const auth = require('../../middlewares/auth.js');

router
  .route(links.transaction.GET_TRANSACTIONS)
  .get(auth.isAuth, withdrawControllers.getAllWithDraws);

router
  .route(links.transaction.CREATE_TRANSACTION)
  .post(
    auth.isAuth,
    validate.withDrawValidate,
    validate.validateInputs,
    withdrawControllers.addWithDraw
  );

router
  .route(links.transaction.UPDATE_TRANSACTION)
  .put(
    auth.isAuth,
    validate.withDrawValidate,
    validate.validateInputs,
    withdrawControllers.updateWithDraw
  );

router
  .route(links.transaction.DELETE_TRANSACTION)
  .delete(
    auth.isAuth,
    withdrawControllers.deleteWithDraw
  );

module.exports = router;
