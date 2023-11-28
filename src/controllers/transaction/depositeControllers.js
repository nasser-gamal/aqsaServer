const depositeServices = require('../../services/transaction/depositeServices');
const transactionServices = require('../../services/transaction/transactionServices');
const asyncHandler = require('express-async-handler');
const { BadRequestError } = require('../../utils/apiError');
const sendResponse = require('../../utils/sendResponse');

exports.addDepsite = asyncHandler(async (req, res, next) => {
  const data = req.body;
  const userId = req.user.id;
  const { message } = await depositeServices.addDeposit(userId, data);
  sendResponse(res, {
    statusCode: 201,
    message,
  });
});

exports.updateDeposite = asyncHandler(async (req, res) => {
  const { transactionId } = req.params;
  const { message } = await depositeServices.updateDeposite(
    transactionId,
    req.body
  );
  return res.status(200).json({ message });
});

exports.getAllDeposites = asyncHandler(async (req, res) => {
  const { docs, pagination } = await transactionServices.getAllTransactions(
    req.query,
    { type: 'ايداع' }
  );

  sendResponse(res, {
    statusCode: 200,
    meta: { pagination },
    data: docs,
  });
});

exports.deleteDeposite = async (req, res, next) => {
  try {
    const { transactionId } = req.params;

    const { message } = await transactionServices.deleteTransaction(
      transactionId,
      'deposit'
    );
    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.restoreDeposite = async (req, res, next) => {
  try {
    const { transactionId } = req.params;

    const { message } = await transactionServices.restoreTransaction(
      transactionId,
      'deposit'
    );
    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};
