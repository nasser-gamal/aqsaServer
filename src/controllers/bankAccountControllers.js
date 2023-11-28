const asyncHandler = require('express-async-handler');
const bankAccountServices = require('../services/bankAccountServices');
const sendResponse = require('../utils/sendResponse');

exports.createBankAccount = asyncHandler(async (req, res) => {
  const { message } = await bankAccountServices.createBankAccount(req.body);
  sendResponse(res, {
    statusCode: 201,
    message,
  });
});

exports.getAllBankAccounts = asyncHandler(async (req, res) => {
  const { docs, pagination } = await bankAccountServices.getAllBankAccounts(
    req.query
  );
  sendResponse(res, {
    statusCode: 200,
    meta: {
      pagination,
    },
    data: docs,
  });
});

exports.getBankAccount = asyncHandler(async (req, res) => {
  const { bankAccountId } = req.params;
  const doc = await bankAccountServices.getBankAccount(bankAccountId);
  sendResponse(res, {
    statusCode: 200,
    data: doc,
  });
});

exports.updateBankAccount = asyncHandler(async (req, res) => {
  const { bankAccountId } = req.params;
  const { message } = await bankAccountServices.updateBankAccount(
    bankAccountId,
    req.body
  );
  sendResponse(res, {
    statusCode: 200,
    message,
  });
});

exports.deleteBankAccount = asyncHandler(async (req, res) => {
  const { bankAccountId } = req.params;
  const { message } = await bankAccountServices.deleteBankAccount(
    bankAccountId
  );
  sendResponse(res, {
    statusCode: 200,
    message,
  });
});
