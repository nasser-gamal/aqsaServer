const asyncHandler = require('express-async-handler');
const transactionServices = require('../../services/transaction/transactionServices.js');
const sendResponse = require('../../utils/sendResponse.js');

exports.getAllTransactions = asyncHandler(async (req, res) => {
  console.log('query---', req.query);
  const { docs, pagination } = await transactionServices.getAllTransactions(
    req.query
  );
  sendResponse(res, {
    statusCode: 200,
    meta: { pagination },
    data: docs,
  });
});

exports.aggregation = asyncHandler(async (req, res) => {
  const { docs } = await transactionServices.aggregation(req.query);
  sendResponse(res, {
    statusCode: 200,
    data: docs,
  });
});
