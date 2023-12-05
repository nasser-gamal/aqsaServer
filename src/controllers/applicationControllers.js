const applicationServices = require('../services/applicationServices');
const asyncHandler = require('express-async-handler');
const sendResponse = require('../utils/sendResponse');

exports.createApp = asyncHandler(async (req, res) => {
  req.body.createdBy = req.user.id;
  const { message } = await applicationServices.createApp(req.files, req.body);
  sendResponse(res, {
    statusCode: 201,
    message,
  });
});

exports.getApps = asyncHandler(async (req, res) => {
  const { docs, pagination } = await applicationServices.getApps(req.query);
  sendResponse(res, {
    statusCode: 200,
    meta: { pagination },
    data: docs,
  });
});

exports.getApp = asyncHandler(async (req, res) => {
  const { appId } = req.params;
  const doc = await applicationServices.getApp(appId);
  sendResponse(res, {
    statusCode: 200,
    data: doc,
  });
});

exports.updateApp = asyncHandler(async (req, res) => {
  const { appId } = req.params;
  const { message } = await applicationServices.updateApp(
    appId,
    req.files,
    req.body
  );

  sendResponse(res, {
    statusCode: 200,
    message,
  });
});

exports.deleteApp = asyncHandler(async (req, res) => {
  const { appId } = req.params;
  const { message } = await applicationServices.deleteApp(appId);
  sendResponse(res, {
    statusCode: 200,
    message,
  });
});

exports.downloadApp = asyncHandler(async (req, res) => {
  const { appId } = req.params;
  const app = await applicationServices.getApp(appId);
  return res.download(app.apk);
});
