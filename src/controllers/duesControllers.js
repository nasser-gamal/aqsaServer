const asyncHandler = require('express-async-handler');
const duesServices = require('../services/duesService');
const sendResponse = require('../utils/sendResponse');

exports.createDues = asyncHandler(async (req, res) => {
  req.body.createdBy = req.user.id;
  const { message } = await duesServices.createDues(req.body);
  sendResponse(res, {
    statusCode: 201,
    message,
  });
});
exports.getDues = asyncHandler(async (req, res) => {
  const { docs, pagination } = await duesServices.getDues(req.query);
  sendResponse(res, {
    statusCode: 200,
    meta: {
      pagination,
    },
    data: docs,
  });
});

exports.getDue = asyncHandler(async (req, res) => {
  const { duesId } = req.params;
  const doc = await duesServices.getDue(duesId);
  sendResponse(res, {
    statusCode: 200,
    data: doc,
  });
});

exports.updateDues = asyncHandler(async (req, res) => {
  const { duesId } = req.params;
  const { message } = await duesServices.updateDues(duesId, req.body);
  sendResponse(res, {
    statusCode: 200,
    message,
  });
});

exports.deleteDues = asyncHandler(async (req, res) => {
  const { duesId } = req.params;
  const { message } = await duesServices.deleteDues(duesId);
  sendResponse(res, {
    statusCode: 200,
    message,
  });
});
