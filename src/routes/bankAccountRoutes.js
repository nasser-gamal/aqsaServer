const express = require('express');
const router = express.Router();

const {
  createBankAccount,
  getAllBankAccounts,
  getBankAccount,
  updateBankAccount,
  deleteBankAccount,
} = require('../controllers/bankAccountControllers');
const { protected, allowedTo, checkActive } = require('../middlewares/auth.js');
const {
  createBankAccountValidate,
  updateBankAccountValidate,
  deleteBankAccountValidate,
  getBankAccountValidate,
} = require('../validator/bankAccountValidator');

router.use(protected);
router.use(checkActive);
router.use(allowedTo(['superAdmin', 'admin']));

router
  .route('/')
  .post(createBankAccountValidate, createBankAccount)
  .get(getAllBankAccounts);

router
  .route('/:bankAccountId')
  .get(getBankAccountValidate, getBankAccount)
  .put(updateBankAccountValidate, updateBankAccount)
  .delete(deleteBankAccountValidate, deleteBankAccount);

module.exports = router;
