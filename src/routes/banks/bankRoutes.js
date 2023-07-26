const express = require('express');
const router = express.Router();

const links = require('../../links/links.js');

const bankControllers = require('../../controllers/banks/bankControllers.js');
const validate = require('../../utils/validation.js');
const auth = require('../../middlewares/auth.js');
const { checkActive } = require('../../middlewares/checkActive.js');

router
  .route(links.bank.GET_BANKS)
  .get(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    bankControllers.getAllBanks
  );

router
  .route(links.bank.GET_BANK)
  .get(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    bankControllers.getBank
  );
router
  .route(links.bank.CREATE_BANK)
  .post(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    validate.bankValidate,
    validate.validateInputs,
    bankControllers.createBank
  );

router
  .route(links.bank.UPDATE_BANK)
  .put(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    validate.bankValidate,
    validate.validateInputs,
    bankControllers.updateBank
  );

router
  .route(links.bank.DELETE_BANK)
  .delete(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    bankControllers.deleteBank
  );

module.exports = router;
