const { body, check } = require('express-validator');
const validatorMiddleware = require('../middlewares/validator');

exports.createFeesValidator = [
  body('amount')
    .trim()
    .not()
    .isEmpty()
    .withMessage('ادخل المبلغ')
    .isNumeric()
    .withMessage('المبلغ يجب ان يكون رقم'),
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

exports.updateFeesValidate = [
  check('feesId').isInt().withMessage('invalid fees id'),
  body('amount').trim().not().isEmpty().withMessage('ادخل المبلغ'),
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

exports.getFeeValidate = [
  check('feesId').isInt().withMessage('invalid fees id'),
  validatorMiddleware,
];

exports.deleteFeeValidate = [
  check('feesId').isInt().withMessage('invalid fees id'),
  validatorMiddleware,
];
