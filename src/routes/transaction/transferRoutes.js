import express from 'express';
const router = express.Router();

import * as transferControllers from '../../controllers/transaction/transferControllers.js';
import links from '../../links/links.js';
import * as validate from '../../utils/validation.js';
import * as auth from '../../middlewares/auth.js';

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

export default router;
