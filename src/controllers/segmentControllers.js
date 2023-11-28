const asyncHandler = require('express-async-handler');
const segmentServices = require('../services/segmentServices');
const sendResponse = require('../utils/sendResponse');

exports.createSegment = asyncHandler(async (req, res) => {
  req.body.createdBy = req.user.id;
  const { message } = await segmentServices.createSegment(req.body);
  sendResponse(res, {
    statusCode: 201,
    message,
  });
});

exports.getSegments = asyncHandler(async (req, res) => {
  const { docs, pagination } = await segmentServices.getSegments(req.query);
  sendResponse(res, {
    statusCode: 200,
    meta: { pagination },
    data: docs,
  });
});

exports.getSegment = asyncHandler(async (req, res) => {
  const { segmentId } = req.params;
  const doc = await segmentServices.getSegment(segmentId);
  sendResponse(res, {
    statusCode: 200,
    data: doc,
  });
});

exports.updateSegment = asyncHandler(async (req, res) => {
  const { segmentId } = req.params;
  const { message } = await segmentServices.updateSegment(segmentId, req.body);
  sendResponse(res, {
    statusCode: 200,
    message,
  });
});

exports.deleteSegment = asyncHandler(async (req, res) => {
  const { segmentId } = req.params;
  const { message } = await segmentServices.deleteSegment(segmentId);
  sendResponse(res, {
    statusCode: 200,
    message,
  });
});
