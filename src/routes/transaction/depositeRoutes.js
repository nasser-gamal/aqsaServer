import express from 'express';
const router = express.Router();

import * as depositeControllers from '../../controllers/transaction/depositeControllers.js';
import links from '../../links/links.js';
import * as validate from '../../utils/validation.js';
import * as auth from '../../middlewares/auth.js';

router
  .route(links.transaction.CREATE_TRANSACTION)
  .post(
     auth.isAuth,
    auth.isAuth,
    validate.depositeValidate,
    validate.validateInputs,
    depositeControllers.addDepsite
  );

router
  .route(links.transaction.GET_TRANSACTIONS)
  .get(auth.isAuth, depositeControllers.getAllDeposites);

router
  .route(links.transaction.UPDATE_TRANSACTION)
  .put(auth.isAuth, depositeControllers.updateDeposite);

router
  .route(links.transaction.DELETE_TRANSACTION)
  .delete(auth.isAuth, depositeControllers.deleteDeposite);
export default router;
