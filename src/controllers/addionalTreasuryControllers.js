const asyncHandler = require('express-async-handler');
const addionalTreasuryServices = require('../services/addionalTreasuryServices');
const sendResponse = require('../utils/sendResponse');

exports.createAddTreasury = asyncHandler(async (req, res) => {
  req.body.createdBy = req.user.id;
  const { message } = await addionalTreasuryServices.createAddTreasury(
    req.body
  );
  sendResponse(res, {
    statusCode: 201,
    message,
  });
});

exports.getAddTreasuries = asyncHandler(async (req, res) => {
  const { docs, pagination } = await addionalTreasuryServices.getAddTreasuries(
    req.query
  );
  sendResponse(res, {
    statusCode: 200,
    meta: {
      pagination,
    },
    data: docs,
  });
});

exports.getAddTreasury = asyncHandler(async (req, res) => {
  const { treasuryId } = req.params;
  const doc = await addionalTreasuryServices.getAddTreasury(treasuryId);
  sendResponse(res, {
    statusCode: 200,
    data: doc,
  });
});

exports.updateAddTreasury = asyncHandler(async (req, res) => {
  const { treasuryId } = req.params;
  const { message } = await addionalTreasuryServices.updateAddTreasury(
    treasuryId,
    req.body
  );
  sendResponse(res, {
    statusCode: 200,
    message,
  });
});

exports.deleteAddTreasury = asyncHandler(async (req, res) => {
  const { treasuryId } = req.params;
  const { message } = await addionalTreasuryServices.deleteAddTreasury(
    treasuryId
  );
  sendResponse(res, {
    statusCode: 200,
    message,
  });
});
