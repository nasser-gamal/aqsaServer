const express = require('express');
const router = express.Router();

const depositeControllers = require('../../controllers/transaction/depositeControllers.js');
const links = require('../../links/links.js');
const validate = require('../../utils/validation.js');
const auth = require('../../middlewares/auth.js');
const { checkActive } = require('../../middlewares/checkActive.js');

router
  .route(links.transaction.CREATE_TRANSACTION)
  .post(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    validate.depositeValidate,
    validate.validateInputs,
    depositeControllers.addDepsite
  );

router
  .route(links.transaction.GET_TRANSACTIONS)
  .get(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    depositeControllers.getAllDeposites
  );

router
  .route(links.transaction.UPDATE_TRANSACTION)
  .put(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    depositeControllers.updateDeposite
  );

router
  .route(links.transaction.DELETE_TRANSACTION)
  .delete(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    depositeControllers.deleteDeposite
  );
module.exports = router;
