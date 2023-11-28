const asyncHandler = require('express-async-handler');
const categoryServices = require('../services/categoryServices');
const sendResponse = require('../utils/sendResponse');

exports.addCategory = asyncHandler(async (req, res) => {
  req.body.createdBy = req.user.id;
  const { message } = await categoryServices.createCategory(req.body);
  sendResponse(res, {
    statusCode: 201,
    message,
  });
});

exports.getAllCategories = asyncHandler(async (req, res) => {
  const { docs, pagination } = await categoryServices.findAllCategories(
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

exports.getCategory = asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;
  const doc = await categoryServices.findCategory(categoryId);
  sendResponse(res, {
    statusCode: 200,
    data: doc,
  });
});

exports.updateCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  req.body.updatedBy = req.user.id;
  const { message } = await categoryServices.updateCategory(
    categoryId,
    req.body
  );
  sendResponse(res, {
    statusCode: 200,
    message,
  });
});

exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;
  const { message } = await categoryServices.deleteCategory(categoryId);
  sendResponse(res, {
    statusCode: 200,
    message,
  });
});
