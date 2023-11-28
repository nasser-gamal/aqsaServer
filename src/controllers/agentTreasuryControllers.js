const asyncHandler = require('express-async-handler');
const agentTreasuryServices = require('../services/agentTreasuryServices');
const sendResponse = require('../utils/sendResponse');

exports.createAgentTreasury = asyncHandler(async (req, res) => {
  req.body.createdBy = req.user.id;
  const { message } = await agentTreasuryServices.createAgentTreasury(req.body);
  sendResponse(res, {
    statusCode: 201,
    message,
  });
});

exports.getAgentTreasuries = asyncHandler(async (req, res) => {
  const { docs, pagination } = await agentTreasuryServices.getAgentTreasuries(
    req.query
  );
  sendResponse(res, {
    statusCode: 200,
    meta: { pagination },
    data: docs,
  });
});

exports.getAgentTreasury = asyncHandler(async (req, res) => {
  const { treasuryId } = req.params;
  const doc = await agentTreasuryServices.getAgentTreasury(treasuryId);
  sendResponse(res, {
    statusCode: 200,
    data: doc,
  });
});

exports.updateAgentTreasury = asyncHandler(async (req, res) => {
  const { treasuryId } = req.params;
  const { message } = await agentTreasuryServices.updateAgentTreasury(
    treasuryId,
    req.body
  );
  sendResponse(res, {
    statusCode: 200,
    message,
  });
});

exports.deleteAgentTreasury = asyncHandler(async (req, res) => {
  const { treasuryId } = req.params;
  const { message } = await agentTreasuryServices.deleteAgentTreasury(
    treasuryId
  );
  sendResponse(res, {
    statusCode: 200,
    message,
  });
});
