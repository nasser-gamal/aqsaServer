const transferServices = require('../services/transferServices');
const asyncHandler = require('express-async-handler');
const sendResponse = require('../utils/sendResponse');


exports.addTransfer = async (req, res, next) => {
  try {
    const data = req.body;
    const userId = req.user.id;

    const { message } = await transferServices.addTransfer(userId, data);
    return res.status(201).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.getTransfers = asyncHandler(async (req, res) => {
  console.log("0000000000000000000000000000000000000")
  const { docs, pagination } = await transferServices.getTransfers(req.query);
  sendResponse(res, {
    statusCode: 200,
    meta: { pagination },
    data: docs,
  });
});

exports.getTransfer = asyncHandler(async (req, res) => {
  const { transactionId } = req.params;
  const doc = await transferServices.getTransfer(transactionId);
  sendResponse(res, {
    statusCode: 200,
    data: doc,
  });
});

exports.updateTransfer = async (req, res, next) => {
  try {
    const { transactionId } = req.params;
    const data = req.body;
    const { message } = await transferServices.updateTransfer(
      transactionId,
      data
    );
    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.deleteTransfer = async (req, res, next) => {
  try {
    const { transactionId } = req.params;
    const { message } = await transferServices.deleteTransfer(transactionId);
    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};
