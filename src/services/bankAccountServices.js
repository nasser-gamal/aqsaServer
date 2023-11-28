const constants = require('../utils/constants.js');
const {
  createDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
} = require('./factory.js');
const { BankAccount, Bank } = require('../models/index.js');
const asyncHandler = require('express-async-handler');

exports.createBankAccount = asyncHandler(async (data) => {
  const doc = await createDoc(BankAccount, data);
  return { doc, message: constants.CREATE_BANK_ACCOUNT_SUCCESS };
});

exports.getAllBankAccounts = asyncHandler(async (query) =>
  getDocs(BankAccount, query, {}, [
    { model: Bank, attributes: ['id', 'bankName'] },
  ])
);

exports.getBankAccount = asyncHandler(async (bankAccountId) =>
  getDoc(BankAccount, bankAccountId, {}, [
    { model: Bank, attributes: ['id', 'bankName'] },
  ])
);

exports.updateBankAccount = asyncHandler(async (bankAccountId, data) => {
  const doc = await updateDoc(BankAccount, bankAccountId, data);
  return { doc, message: constants.UPDATE_BANK_ACCOUNT_SUCCESS };
});

exports.deleteBankAccount = asyncHandler(async (bankAccountId) => {
    await updateDoc(BankAccount, bankAccountId, { isDeleted: true });

  return { message: constants.DELETE_BANK_ACCOUNT_SUCCESS };
});
