const express = require('express');
const router = express.Router();

const depositeControllers = require('../../controllers/transaction/depositeControllers.js');
const links = require('../../links/links.js');
const validate = require('../../utils/validation.js');
const auth = require('../../middlewares/auth.js');

router
  .route(links.transaction.CREATE_TRANSACTION)
  .post(
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
module.exports = router;
