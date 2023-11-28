const { body, check } = require('express-validator');
const Category = require('../models/categoryModel');
const validatorMiddleware = require('../middlewares/validator');
const { Op } = require('sequelize');
const SubCategory = require('../models/subCategory');
const { BadRequestError } = require('../utils/apiError');

exports.createSubCategoryValidate = [
  body('categoryId')
    .isInt()
    .withMessage('invalid category id')
    .custom(async (value, { req }) => {
      const category = await Category.findOne({
        where: { id: value, isDeleted: false },
      });
      if (!category) throw new BadRequestError('هذة الخدمة غير موجودة');
      return true;
    }),
  body('name')
    .trim()
    .notEmpty()
    .withMessage('اسم الخدمة المطلوب')
    .custom(async (value, { req }) => {
      const subCategory = await SubCategory.findOne({
        where: {
          name: value,
          categoryId: req.body.categoryId,
          isDeleted: false,
        },
      });
      if (subCategory) throw new BadRequestError('هذة الخدمة موجودة');
      return true;
    }),
  body('note').trim().optional(),
  validatorMiddleware,
];

exports.updateSubCategoryValidate = [
  body('categoryId')
    .isInt()
    .withMessage('invalid category id')
    .custom(async (value, { req }) => {
      const category = await Category.findOne({
        where: { id: value, isDeleted: false },
      });
      if (!category) throw new BadRequestError('هذة الخدمة غير موجودة');
      return true;
    }),
  check('subCategoryId').isInt().withMessage('invalid category id'),
  body('name')
    .trim()
    .notEmpty()
    .withMessage('اسم الخدمة المطلوب')
    .custom(async (value, { req }) => {
      const subCategory = await SubCategory.findOne({
        where: {
          [Op.and]: {
            id: { [Op.ne]: req.params.subCategoryId },
            name: value,
            categoryId: req.body.categoryId,
            isDeleted: false,
          },
        },
      });
      if (subCategory) throw new BadRequestError('هذة الخدمة موجودة');
      return true;
    }),
  body('note').trim().optional(),
  validatorMiddleware,
];

exports.getSubCategoryValidate = [
  check('subCategoryId').isInt().withMessage('invalid category id'),
  validatorMiddleware,
];

exports.deleteSubCategoryValidate = [
  check('subCategoryId').isInt().withMessage('invalid category id'),
  validatorMiddleware,
];
