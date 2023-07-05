import express from 'express';
const router = express.Router();

import * as withdrawControllers from '../../controllers/transaction/withdrawControllers.js';
import links from '../../links/links.js';
import * as validate from '../../utils/validation.js';
import * as auth from '../../middlewares/auth.js';

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

export default router;
