const express = require('express');
const router = express.Router();

const withdrawControllers = require('../../controllers/transaction/withdrawControllers.js');
const links = require('../../links/links.js');
const validate = require('../../utils/validation.js');
const { protected, allowedTo, checkActive } = require('../../middlewares/auth');


router
  .route(links.transaction.GET_TRANSACTIONS)
  .get(
    protected,
    checkActive,
    allowedTo(['superAdmin', 'admin']),
    withdrawControllers.getAllWithDraws
  );

router
  .route(links.transaction.CREATE_TRANSACTION)
  .post(
    protected,
    checkActive,
    allowedTo(['superAdmin', 'admin']),
    validate.withDrawValidate,
    validate.validateInputs,
    withdrawControllers.addWithDraw
  );

router
  .route(links.transaction.UPDATE_TRANSACTION)
  .put(
    protected,
    checkActive,
    allowedTo(['superAdmin', 'admin']),
    validate.withDrawValidate,
    validate.validateInputs,
    withdrawControllers.updateWithDraw
  );

router
  .route(links.transaction.DELETE_TRANSACTION)
  .delete(
    protected,
    checkActive,
    allowedTo(['superAdmin', 'admin']),
    withdrawControllers.deleteWithDraw
  );

router
  .route(links.transaction.RESTORE_TRANSACTION)
  .put(
    protected,
    checkActive,
    allowedTo(['superAdmin', 'admin']),
    withdrawControllers.restoreWithDraw
  );

module.exports = router;
