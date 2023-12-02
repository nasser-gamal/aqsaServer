const asyncHandler = require('express-async-handler');
const transactionServices = require('../../services/transaction/transactionServices.js');
const sendResponse = require('../../utils/sendResponse.js');

exports.getAllTransactions = asyncHandler(async (req, res) => {
  const { docs, pagination, totalDeposite, totalWithdraw, profit } =
    await transactionServices.getAllTransactions(req.query);
  sendResponse(res, {
    statusCode: 200,
    meta: { pagination, totalDeposite, totalWithdraw, profit },
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
