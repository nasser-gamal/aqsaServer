const asyncHandler = require('express-async-handler');
const providerServices = require('../services/providerServices');
const sendResponse = require('../utils/sendResponse');

exports.createProvider = asyncHandler(async (req, res) => {
  req.body.createdBy = req.user.id;
  const { message } = await providerServices.createProvider(req.body);
  sendResponse(res, {
    statusCode: 201,
    message,
  });
});

exports.getProviders = asyncHandler(async (req, res) => {
  const { docs, pagination } = await providerServices.getProviders(req.query);
  sendResponse(res, {
    statusCode: 200,
    meta: { pagination },
    data: docs,
  });
});

exports.getProvider = asyncHandler(async (req, res) => {
  const { providerId } = req.params;
  const doc = await providerServices.getProvider(providerId);
  sendResponse(res, {
    statusCode: 200,
    data: doc,
  });
});

exports.updateProvider = asyncHandler(async (req, res) => {
  const { providerId } = req.params;
  const { message } = await providerServices.updateProvider(
    providerId,
    req.body
  );
  sendResponse(res, {
    statusCode: 200,
    message,
  });
});

exports.deleteProvider = asyncHandler(async (req, res) => {
  const { providerId } = req.params;
  const { message } = await providerServices.deleteProvider(providerId);
  sendResponse(res, {
    statusCode: 200,
    message,
  });
});
