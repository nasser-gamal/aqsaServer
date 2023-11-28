const asyncHandler = require('express-async-handler');
const bankServices = require('../services/bankServices');
const sendResponse = require('../utils/sendResponse');

exports.createBank = asyncHandler(async (req, res) => {
  req.body.createdBy = req.user.id;
  const { message } = await bankServices.createBank(req.body);
  sendResponse(res, {
    statusCode: 201,
    message,
  });
});

exports.getBanks = async (req, res) => {
  const { docs, pagination } = await bankServices.getBanks(req.query);
  sendResponse(res, {
    statusCode: 200,
    meta: { pagination },
    data: docs,
  });
};

exports.getBank = asyncHandler(async (req, res) => {
  const { bankId } = req.params;
  const doc = await bankServices.getBank(bankId);
  sendResponse(res, {
    statusCode: 200,
    data: doc,
  });
});

exports.updateBank = asyncHandler(async (req, res) => {
  const { bankId } = req.params;
  req.body.updatedBy = req.user.id;
  const { message } = await bankServices.updateBank(bankId, req.body);
  sendResponse(res, {
    statusCode: 200,
    message,
  });
});

exports.deleteBank = asyncHandler(async (req, res) => {
  const { bankId } = req.params;
  const { message } = await bankServices.deleteBank(bankId);
  sendResponse(res, {
    statusCode: 200,
    message,
  });
});
