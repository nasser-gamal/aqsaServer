const { body, check } = require('express-validator');
const validatorMiddleware = require('../middlewares/validator');

exports.createProviderTreasuryValidator = [
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

exports.updateProviderTreasuryValidate = [
  check('treasuryId').isInt().withMessage('invalid ProviderTreasury id'),
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

exports.getProviderTreasuryValidate = [
  check('treasuryId').isInt().withMessage('invalid ProviderTreasury id'),
  validatorMiddleware,
];

exports.deleteProviderTreasuryValidate = [
  check('treasuryId').isInt().withMessage('invalid ProviderTreasury id'),
  validatorMiddleware,
];
