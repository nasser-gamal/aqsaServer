const asyncHandler = require('express-async-handler');
const userServices = require('../services/userServices');
const sendResponse = require('../utils/sendResponse');

exports.createUser = asyncHandler(async (req, res) => {
  const { message, password } = await userServices.createUser(req.body);
  sendResponse(res, {
    statusCode: 201,
    message,
    data: password,
  });
});

exports.getUsers = asyncHandler(async (req, res) => {
  console.log(req.query);
  const { docs, pagination } = await userServices.getUsers(req.query);
  sendResponse(res, {
    statusCode: 200,
    meta: {
      pagination,
    },
    data: docs,
  });
});

exports.getUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const doc = await userServices.getUser(userId);
  sendResponse(res, {
    statusCode: 200,
    data: doc,
  });
});

exports.updateUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { message } = await userServices.updateUser(userId, req.body);
  sendResponse(res, {
    statusCode: 200,
    message,
  });
});

exports.updateUserStatus = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { message } = await userServices.updateStatus(userId);
  sendResponse(res, {
    statusCode: 200,
    message,
  });
});

exports.updatePasswordManual = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { message } = await userServices.updatePasswordManual(userId, req.body);
  sendResponse(res, {
    statusCode: 200,
    message,
  });
});

exports.updatePassword = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { message } = await userServices.updatePassword(userId);
  sendResponse(res, {
    statusCode: 200,
    message,
  });
});

exports.getAgents = asyncHandler(async (req, res) => {
  req.query = {
    ...req.query,
    roleId: 3,
    limit: 99999,
    fields: '-nationalId,-email,-role,-roldId',
  };
  const { docs } = await userServices.getUsers(req.query);
  sendResponse(res, {
    statusCode: 200,
    data: docs,
  });
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { message } = await userServices.deleteUser(userId);
  sendResponse(res, {
    statusCode: 200,
    message,
  });
});
