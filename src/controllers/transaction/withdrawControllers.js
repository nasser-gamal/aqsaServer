const asyncHandler = require('express-async-handler');
const transactionServices = require('../../services/transaction/transactionServices');
const withdrawServices = require('../../services/transaction/withdrawServices');
const sendResponse = require('../../utils/sendResponse');

exports.addWithDraw = async (req, res, next) => {
  try {
    const data = req.body;
    const userId = req.user.id;

    const { message } = await withdrawServices.addWithDraw(userId, data);
    return res.status(201).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.updateWithDraw = async (req, res, next) => {
  try {
    const data = req.body;
    const { transactionId } = req.params;

    const { message } = await withdrawServices.updateWithDraw(
      transactionId,
      data
    );

    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.getAllWithDraws = asyncHandler(async (req, res, next) => {
  const { docs, pagination } = await transactionServices.getAllTransactions(
    req.query,
    { type: 'سحب' }
  );

  sendResponse(res, {
    statusCode: 200,
    meta: { pagination },
    data: docs,
  });
});

exports.deleteWithDraw = async (req, res, next) => {
  try {
    const { transactionId } = req.params;

    const { message } = await transactionServices.deleteTransaction(
      transactionId,
      'withdraw'
    );
    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.restoreWithDraw = async (req, res, next) => {
  try {
    const { transactionId } = req.params;

    const { message } = await transactionServices.restoreTransaction(
      transactionId,
      'withdraw'
    );
    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};
