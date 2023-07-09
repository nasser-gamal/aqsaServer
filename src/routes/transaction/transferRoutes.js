const express = require('express');
const router = express.Router();

const transferControllers = require('../../controllers/transaction/transferControllers.js');
const links = require('../../links/links.js');
const validate = require('../../utils/validation.js');
const auth = require('../../middlewares/auth.js');

router
  .route(links.transaction.GET_TRANSACTIONS)
  .get(auth.isAuth, transferControllers.getAllTransfers);

router
  .route(links.transaction.GET_TRANSACTION)
  .get(auth.isAuth, transferControllers.getTransfer);

router
  .route(links.transaction.CREATE_TRANSACTION)
  .post(
    auth.isAuth,
    validate.transferValidate,
    validate.validateInputs,
    transferControllers.addTransfer
  );

router
  .route(links.transaction.UPDATE_TRANSFER)
  .put(
    auth.isAuth,
    validate.transferValidate,
    validate.validateInputs,
    transferControllers.updateTransfer
  );

router
  .route(links.transaction.DELETE_TRANSACTION)
  .delete(auth.isAuth, transferControllers.deleteTransfer);

module.exports = router;
