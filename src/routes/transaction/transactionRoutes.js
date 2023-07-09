const express = require('express');
const router = express.Router();

const transactionControllers = require('../../controllers/transaction/transactionControllers.js');
const links = require('../../links/links.js');
const auth = require('../../middlewares/auth.js');

router
  .route(links.transaction.GET_TRANSACTIONS)
  .get(auth.isAuth, transactionControllers.getAllTransactions);


module.exports = router;
