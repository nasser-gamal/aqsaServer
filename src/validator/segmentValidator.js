const { body, check } = require('express-validator');
const validatorMiddleware = require('../middlewares/validator');
const Category = require('../models/categoryModel');
const { BadRequestError } = require('../utils/apiError');
const Segment = require('../models/segmentsModel');
const { Op } = require('sequelize');

exports.createSegmentValidate = [
  body('serviceId')
    .trim()
    .notEmpty()
    .withMessage('اختر الخدمة')
    .custom(async (value, { req }) => {
      const category = await Category.findByPk(value);
      if (!category) throw new BadRequestError('الخدمة غير موجودة');
      return true;
    }),
  body('title')
    .trim()
    .notEmpty()
    .withMessage('ادخل الشريحة')
    .custom(async (value, { req }) => {
      const segment = await Segment.findOne({
        where: { title: value, serviceId: req.body.serviceId },
      });
      if (segment) throw new BadRequestError('الشريحة موجودة');
      return true;
    }),
  body('start')
    .trim()
    .notEmpty()
    .withMessage('ادخل بداية الشريحة')
    .isNumeric()
    .withMessage('بداية الشريحة يجب ان تكون رقم'),
  body('end')
    .trim()
    .optional()
    .isNumeric()
    .withMessage('نهاية الشريحة يجب ان تكون رقم'),
  body('percentage')
    .trim()
    .notEmpty()
    .withMessage('ادخل النسبة او العمولة')
    .isNumeric()
    .withMessage(' النسبة يجب ان تكون رقم'),
  validatorMiddleware,
];

exports.updateSegmentValidate = [
  check('segmentId').isInt().withMessage('invalid sgement id'),
  body('serviceId')
    .trim()
    .notEmpty()
    .withMessage('اختر الخدمة')
    .custom(async (value, { req }) => {
      const category = await Category.findByPk(value);
      if (!category) throw new BadRequestError('الخدمة غير موجودة');
      return true;
    }),
  body('title')
    .trim()
    .notEmpty()
    .withMessage('ادخل الشريحة')
    .custom(async (value, { req }) => {
      const segment = await Segment.findOne({
        where: {
          [Op.and]: {
            id: { [Op.ne]: req.params.segmentId },
            title: value,
            serviceId: req.body.serviceId,
          },
        },
      });
      if (segment) throw new BadRequestError('الشريحة موجودة');
      return true;
    }),
  body('start')
    .trim()
    .notEmpty()
    .withMessage('ادخل بداية الشريحة')
    .isNumeric()
    .withMessage('بداية الشريحة يجب ان تكون رقم'),
  body('end')
    .trim()
    .optional()
    .isNumeric()
    .withMessage('نهاية الشريحة يجب ان تكون رقم'),
  body('percentage')
    .trim()
    .notEmpty()
    .withMessage('ادخل النسبة او العمولة')
    .isNumeric()
    .withMessage(' النسبة يجب ان تكون رقم'),
  validatorMiddleware,
];

exports.getSegmentValidate = [
  check('segmentId').isInt().withMessage('invalid sgement id'),
  validatorMiddleware,
];

exports.deleteSegmentValidate = [
  check('segmentId').isInt().withMessage('invalid sgement id'),
  validatorMiddleware,
];
