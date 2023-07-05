import express from 'express';
const router = express.Router();

import links from '../../links/links.js';

import * as bankAccountControllers from '../../controllers/banks/bankAccountControllers.js';
import * as validate from '../../utils/validation.js';
import * as auth from '../../middlewares/auth.js';

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

export default router;
