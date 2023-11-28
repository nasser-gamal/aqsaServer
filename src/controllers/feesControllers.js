const asyncHandler = require('express-async-handler');
const feesServices = require('../services/feesServices');
const sendResponse = require('../utils/sendResponse');

exports.createFee = asyncHandler(async (req, res) => {
  console.log(req.body)
  req.body.createdBy = req.user.id;
  const { message } = await feesServices.createFees(req.body);
  sendResponse(res, {
    statusCode: 201,
    message,
  });
});

exports.getFees = asyncHandler(async (req, res) => {
  const { docs, pagination } = await feesServices.getFees(req.query);
  sendResponse(res, {
    statusCode: 200,
    meta: { pagination },
    data: docs,
  });
});

exports.getFee = asyncHandler(async (req, res) => {
  const { feesId } = req.params;
  const doc = await feesServices.getFee(feesId);
  sendResponse(res, {
    statusCode: 200,
    data: doc,
  });
});

exports.updateFee = asyncHandler(async (req, res) => {
  const { feesId } = req.params;
  const { message } = await feesServices.updateFees(feesId, req.body);
  sendResponse(res, {
    statusCode: 200,
    message,
  });
});

exports.deleteFee = asyncHandler(async (req, res) => {
  const { feesId } = req.params;
  const { message } = await feesServices.deleteFees(feesId);
  sendResponse(res, {
    statusCode: 200,
    message,
  });
});
