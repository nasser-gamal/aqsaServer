const asyncHandler = require('express-async-handler');
const sendResponse = require('../utils/sendResponse');
const providerTreasuryServices = require('../services/providerTreasuryServices');

exports.createProviderTreasury = asyncHandler(async (req, res) => {
  req.body.createdBy = req.user.id;
  const { message } = await providerTreasuryServices.createProviderTreasury(
    req.body
  );
  sendResponse(res, {
    statusCode: 201,
    message,
  });
});

exports.getProviderTreasuries = asyncHandler(async (req, res) => {
  const { docs, pagination } =
    await providerTreasuryServices.getProviderTreasuries(req.query);
  sendResponse(res, {
    statusCode: 200,
    meta: {
      pagination,
    },
    data: docs,
  });
});

exports.getProviderTreasury = asyncHandler(async (req, res) => {
  const { treasuryId } = req.params;
  const doc = await providerTreasuryServices.getProviderTreasury(treasuryId);
  sendResponse(res, {
    statusCode: 200,
    data: doc,
  });
});

exports.updateProviderTreasury = asyncHandler(async (req, res) => {
  const { treasuryId } = req.params;
  const { message } = await providerTreasuryServices.updateProviderTreasury(
    treasuryId,
    req.body
  );
  sendResponse(res, {
    statusCode: 200,
    message,
  });
});

exports.deleteProviderTreasury = asyncHandler(async (req, res) => {
  const { treasuryId } = req.params;
  const { message } = await providerTreasuryServices.deleteProviderTreasury(
    treasuryId
  );
  sendResponse(res, {
    statusCode: 200,
    message,
  });
});
