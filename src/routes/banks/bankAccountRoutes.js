const express = require('express');
const router = express.Router();

const links = require('../../links/links.js');

const bankAccountControllers = require('../../controllers/banks/bankAccountControllers.js');
const validate = require('../../utils/validation.js');
const auth = require('../../middlewares/auth.js');

router
  .route(links.bankAccount.GET_BANK_ACCOUNTS)
  .get(auth.isAuth, bankAccountControllers.getAllBankAccounts);

router
  .route(links.bankAccount.GET_BANK_ACCOUNT)
  .get(auth.isAuth, bankAccountControllers.getBankAccount);
router
  .route(links.bankAccount.CREATE_BANK_ACCOUNT)
  .post(
    auth.isAuth,
    validate.bankAccountValidate,
    validate.validateInputs,
    bankAccountControllers.createBankAccount
  );

router
  .route(links.bankAccount.UPDATE_BANK_ACCOUNT)
  .put(
    auth.isAuth,
    validate.bankAccountValidate,
    validate.validateInputs,
    bankAccountControllers.updateBankAccount
  );

router
  .route(links.bankAccount.DELETE_BANK_ACCOUNT)
  .delete(auth.isAuth, bankAccountControllers.deleteBankAccount);

module.exports = router;
