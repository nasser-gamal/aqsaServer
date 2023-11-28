const asyncHandler = require('express-async-handler');
const roleServices = require('../services/roleServices');
const sendResponse = require('../utils/sendResponse');

exports.createRole = asyncHandler(async (req, res) => {
  const { message } = await roleServices.createRole(req.body);
  sendResponse(res, {
    statusCode: 201,
    message,
  });
});

exports.getRoles = asyncHandler(async (req, res) => {
  const { docs, pagination } = await roleServices.getRoles(req.query);
  sendResponse(res, {
    statusCode: 200,
    meta: {
      pagination,
    },
    data: docs,
  });
});

exports.getRole = asyncHandler(async (req, res) => {
  const { roleId } = req.params;
  const doc = await roleServices.getRole(roleId);
  sendResponse(res, {
    statusCode: 200,
    data: doc,
  });
});

exports.updateRole = asyncHandler(async (req, res) => {
  const { roleId } = req.params;
  const { message } = await roleServices.updateRole(roleId, req.body);
  sendResponse(res, {
    statusCode: 200,
    message,
  });
});

exports.deleteRole = asyncHandler(async (req, res) => {
  const { roleId } = req.params;
  const { message } = await roleServices.deleteRole(roleId);
  sendResponse(res, {
    statusCode: 200,
    message,
  });
});
