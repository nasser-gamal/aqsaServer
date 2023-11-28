const asyncHandler = require('express-async-handler');
const providerCommissionServices = require('../services/providerCommissionServices');
const sendResponse = require('../utils/sendResponse');

exports.createProviderCommission = asyncHandler(async (req, res) => {
  req.body.createdBy = req.user.id;
  const { message } = await providerCommissionServices.createProviderCommission(
    req.body
  );
  sendResponse(res, {
    statusCode: 201,
    message,
  });
});

exports.getProviderCommissions = asyncHandler(async (req, res) => {
  const { docs, pagination } =
    await providerCommissionServices.getProviderComissions(req.query);
  sendResponse(res, {
    statusCode: 200,
    meta: { pagination },
    data: docs,
  });
});

exports.getProviderCommission = asyncHandler(async (req, res) => {

  const { providerCommId } = req.params;
  const doc = await providerCommissionServices.getProviderComission(
    providerCommId
  );
  sendResponse(res, {
    statusCode: 200,
    data: doc,
  });
});

exports.updateProviderCommission = asyncHandler(async (req, res) => {
  const { providerCommId } = req.params;
  const { message } = await providerCommissionServices.updateProviderCommission(
    providerCommId,
    req.body
  );
  sendResponse(res, {
    statusCode: 200,
    message,
  });
});

exports.deleteProviderCommission = asyncHandler(async (req, res) => {
  const { providerCommId } = req.params;
  const { message } = await providerCommissionServices.deleteProviderCommission(
    providerCommId
  );
  sendResponse(res, {
    statusCode: 200,
    message,
  });
});
