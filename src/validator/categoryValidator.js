const { body, check } = require('express-validator');
const Category = require('../models/categoryModel');
const validatorMiddleware = require('../middlewares/validator');
const { Op } = require('sequelize');
const { BadRequestError } = require('../utils/apiError');

exports.createCategoryValidate = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('اسم الخدمة المطلوب')
    .custom(async (value, { req }) => {
      const category = await Category.findOne({ where: { name: value } });
      if (category) throw new BadRequestError('هذة الخدمة موجودة');
      return true;
    }),
  body('note').trim().optional(),
  validatorMiddleware,
];

exports.updateCategoryValidate = [
  check('categoryId').isInt().withMessage('invalid category id'),
  body('name')
    .trim()
    .notEmpty()
    .withMessage('اسم الخدمة المطلوب')
    .custom(async (value, { req }) => {
      const category = await Category.findOne({
        where: {
          [Op.and]: {
            id: { [Op.ne]: req.params.categoryId },
            name: value,
          },
        },
      });
      if (category) throw new BadRequestError('هذة الخدمة موجودة');
      return true;
    }),
  body('note').trim().optional(),
  validatorMiddleware,
];

exports.getCategoryValidate = [
  check('categoryId').isInt().withMessage('invalid category id'),
  validatorMiddleware,
];

exports.deleteCategoryValidate = [
  check('categoryId').isInt().withMessage('invalid category id'),
  validatorMiddleware,
];
