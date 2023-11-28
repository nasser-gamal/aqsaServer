const { body, check } = require('express-validator');
const validatorMiddleware = require('../middlewares/validator');

exports.createDuesValidator = [
  body('amount')
    .trim()
    .not()
    .isEmpty()
    .withMessage('ادخل المبلغ')
    .isFloat()
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

exports.updateDuesValidate = [
  check('duesId').isInt().withMessage('invalid dues id'),
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

exports.getDueValidate = [
  check('duesId').isInt().withMessage('invalid dues id'),
  validatorMiddleware,
];

exports.deleteDueValidate = [
  check('duesId').isInt().withMessage('invalid dues id'),
  validatorMiddleware,
];
