const constants = require('../utils/constants.js');
const {
  createDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
} = require('./factory.js');
const asyncHandler = require('express-async-handler');
const Category = require('../models/categoryModel.js');
const SubCategory = require('../models/subCategory.js');

exports.createCategory = asyncHandler(async (data) => {
  await createDoc(Category, data);
  return { message: constants.CREATE_CATEGORY_SUCCESS };
});

exports.findAllCategories = asyncHandler(async (query, filterObj) =>
  getDocs(Category, query, filterObj,
    [
    {
      model: SubCategory,
      where: { isDeleted: false },
      attributes: ['id', 'name', 'categoryId'],
    },
  ]
  )
);

exports.findCategory = asyncHandler(async (categoryId) =>
  getDoc(Category, categoryId, {})
);

exports.updateCategory = asyncHandler(async (categoryId, data) => {
  await updateDoc(Category, categoryId, data);
  return { message: constants.UPDATE_CATEGORY_SUCCESS };
});

exports.deleteCategory = asyncHandler(async (categoryId) => {
  await updateDoc(Category, categoryId, { isDeleted: true });
  return { message: constants.DELETE_CATEGORY_SUCCESS };
});
