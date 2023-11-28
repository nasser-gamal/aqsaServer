const asyncHandler = require('express-async-handler');
const subCategorySerivce = require('../services/subCategorySerivce');
const sendResponse = require('../utils/sendResponse');

exports.createSubCategory = asyncHandler(async (req, res) => {
  req.body.createdBy = req.user.id;
  const { message } = await subCategorySerivce.createSubCategory(req.body);
  sendResponse(res, {
    statusCode: 201,
    message,
  });
});

exports.getSubCategories = asyncHandler(async (req, res) => {
  const { docs, pagination } = await subCategorySerivce.getSubCategories(
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



exports.getSubCategory = asyncHandler(async (req, res) => {
  const { subCategoryId } = req.params;
  const doc = await subCategorySerivce.getSubCategory(subCategoryId);
  sendResponse(res, {
    statusCode: 200,
    data: doc,
  });
});

exports.updateSubCategory = asyncHandler(async (req, res) => {
  const { subCategoryId } = req.params;
  req.body.updatedBy = req.user.id;
  const { message } = await subCategorySerivce.updateSubCategory(
    subCategoryId,
    req.body
  );
  sendResponse(res, {
    statusCode: 200,
    message,
  });
});

exports.deleteSubCategory = asyncHandler(async (req, res) => {
  const { subCategoryId } = req.params;
  const { message } = await subCategorySerivce.deleteSubCategory(subCategoryId);
  sendResponse(res, {
    statusCode: 200,
    message,
  });
});
