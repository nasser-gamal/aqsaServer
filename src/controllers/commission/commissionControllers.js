const commissionsServices = require('../../services/commission/commissionsServices');
const sendResponse = require('../../utils/sendResponse');
const asyncHandler = require('express-async-handler');

exports.addCommission = async (req, res, next) => {
  try {
    const data = req.body;
    const userId = req.user.id;

    const { message } = await commissionsServices.createAgentCommission(
      userId,
      data
    );
    return res.status(201).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.getUserCommission = asyncHandler(async (req, res, next) => {
  const { docs } = await commissionsServices.getUserCommission(req.query);
  sendResponse(res, {
    statusCode: 200,
    data: docs,
  });
});

exports.getLoggedUserCommission = asyncHandler(async (req, res, next) => {
  req.query.agentId = req.user.id;
  const { docs } = await commissionsServices.getUserCommission(req.query);
  sendResponse(res, {
    statusCode: 200,
    data: docs,
  });
});

exports.updateCommission = async (req, res, next) => {
  try {
    const data = req.body;
    const { commissionId } = req.params;

    const { message } = await commissionsServices.updateCommission(
      commissionId,
      data
    );
    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.deleteCommission = async (req, res, next) => {
  try {
    const { commissionId } = req.params;

    const { message } = await commissionsServices.deleteCommission(
      commissionId
    );
    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.getCommission = async (req, res, next) => {
  try {
    const { commissionId } = req.params;

    const { commission } = await commissionsServices.findCommissionById(
      commissionId
    );
    return res.status(200).json({ commission });
  } catch (err) {
    return next(err);
  }
};
