const express = require('express');
const router = express.Router();

const withdrawControllers = require('../../controllers/transaction/withdrawControllers.js');
const links = require('../../links/links.js');
const validate = require('../../utils/validation.js');
const auth = require('../../middlewares/auth.js');
const { checkActive } = require('../../middlewares/checkActive.js');

router
  .route(links.transaction.GET_TRANSACTIONS)
  .get(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    withdrawControllers.getAllWithDraws
  );

router
  .route(links.transaction.CREATE_TRANSACTION)
  .post(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    validate.withDrawValidate,
    validate.validateInputs,
    withdrawControllers.addWithDraw
  );

router
  .route(links.transaction.UPDATE_TRANSACTION)
  .put(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    validate.withDrawValidate,
    validate.validateInputs,
    withdrawControllers.updateWithDraw
  );

router
  .route(links.transaction.DELETE_TRANSACTION)
  .delete(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    withdrawControllers.deleteWithDraw
  );

router
  .route(links.transaction.RESTORE_TRANSACTION)
  .put(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    withdrawControllers.restoreWithDraw
  );

module.exports = router;
