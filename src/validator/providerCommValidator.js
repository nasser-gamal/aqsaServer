const { body, check } = require('express-validator');
const validatorMiddleware = require('../middlewares/validator');
const { Provider } = require('../models');
const { BadRequestError } = require('../utils/apiError');

exports.createProviderCommValidate = [
  body('providerId')
    .trim()
    .notEmpty()
    .withMessage('اختر المزود')
    .custom(async (value, { req }) => {
      const provider = await Provider.findByPk(value);
      if (!provider) throw new BadRequestError('المزود غير موجود');
      return true;
    }),
  body('commission')
    .trim()
    .notEmpty()
    .withMessage('ادخل العمولة')
    .isNumeric()
    .withMessage('العمولة يجب أن تكون قيمة'),
  body('date')
    .trim()
    .not()
    .isEmpty()
    .withMessage('اختر التاريخ'),
    // .isDate()
    // .withMessage('تاريخ غير صالح'),
  body('note').trim().optional(),
  validatorMiddleware,
];

exports.updateProviderCommValidate = [
  check('providerCommId').isInt().withMessage('invalid providerCommission id'),
  body('providerId')
    .trim()
    .notEmpty()
    .withMessage('اختر المزود')
    .custom(async (value, { req }) => {
      const provider = await Provider.findByPk(value);
      if (!provider) throw new BadRequestError('المزود غير موجود');
      return true;
    }),
  body('commission')
    .trim()
    .notEmpty()
    .withMessage('ادخل العمولة')
    .isNumeric()
    .withMessage('العمولة يجب أن تكون قيمة'),
  body('date')
    .trim()
    .not()
    .isEmpty()
    .withMessage('اختر التاريخ'),
    // .isDate()
    // .withMessage('تاريخ غير صالح'),
  body('note').trim().optional(),
  validatorMiddleware,
];

exports.getProviderCommValidate = [
  check('providerCommId').isInt().withMessage('invalid providerCommission id'),
  validatorMiddleware,
];

exports.deleteProviderCommValidate = [
  check('providerCommId').isInt().withMessage('invalid providerCommission id'),
  validatorMiddleware,
];
