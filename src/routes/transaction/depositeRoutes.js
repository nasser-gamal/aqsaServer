const express = require('express');
const router = express.Router();

const depositeControllers = require('../../controllers/transaction/depositeControllers');
const links = require('../../links/links');
const validate = require('../../utils/validation');
const { protected, allowedTo, checkActive } = require('../../middlewares/auth');


router
  .route(links.transaction.CREATE_TRANSACTION)
  .post(
    protected,
    checkActive,
    allowedTo(['superAdmin', 'admin']),
    validate.depositeValidate,
    validate.validateInputs,
    depositeControllers.addDepsite
  );

router
  .route(links.transaction.GET_TRANSACTIONS)
  .get(
    protected,
    checkActive,
    allowedTo(['superAdmin', 'admin']),
    depositeControllers.getAllDeposites
  );

router
  .route(links.transaction.UPDATE_TRANSACTION)
  .put(
    protected,
    checkActive,
    allowedTo(['superAdmin', 'admin']),
    depositeControllers.updateDeposite
  );

router
  .route(links.transaction.DELETE_TRANSACTION)
  .delete(
    protected,
    checkActive,
    allowedTo(['superAdmin', 'admin']),
    depositeControllers.deleteDeposite
  );

router
  .route(links.transaction.RESTORE_TRANSACTION)
  .put(
    protected,
    checkActive,
    allowedTo(['superAdmin', 'admin']),
    depositeControllers.restoreDeposite
  );

module.exports = router;
