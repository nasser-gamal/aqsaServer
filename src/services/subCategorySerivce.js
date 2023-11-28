const constants = require('../utils/constants.js');
const {
  createDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
} = require('./factory.js');
const asyncHandler = require('express-async-handler');
const SubCategory = require('../models/subCategory.js');
const Category = require('../models/categoryModel.js');
const ApiFeature = require('../utils/ApiFeature.js');
const { sequelize } = require('../config/database.js');

exports.createSubCategory = asyncHandler(async (data) => {
  await createDoc(SubCategory, data);
  return { message: constants.CREATE_CATEGORY_SUCCESS };
});

exports.getSubCategories = asyncHandler(async (query, filterObj) =>
  getDocs(SubCategory, query, filterObj, [
    {
      model: Category,
      attributes: ['id', 'name'],
    },
  ])
);


exports.getSubCategory = asyncHandler(async (subCategoryId) =>
  getDoc(SubCategory, subCategoryId, {})
);

exports.updateSubCategory = asyncHandler(async (subCategoryId, data) => {
  await updateDoc(SubCategory, subCategoryId, data);
  return { message: constants.UPDATE_CATEGORY_SUCCESS };
});

exports.deleteSubCategory = asyncHandler(async (subCategoryId) => {
  await updateDoc(SubCategory, subCategoryId, { isDeleted: true });
  return { message: constants.DELETE_CATEGORY_SUCCESS };
});
