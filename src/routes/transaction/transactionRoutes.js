import express from 'express';
const router = express.Router();

import * as transactionControllers from '../../controllers/transaction/transactionControllers.js';
import links from '../../links/links.js';
import * as auth from '../../middlewares/auth.js';

router
  .route(links.transaction.GET_TRANSACTIONS)
  .get(auth.isAuth, transactionControllers.getAllTransactions);


export default router;
