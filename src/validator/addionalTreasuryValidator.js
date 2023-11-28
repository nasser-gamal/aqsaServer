const { body, check } = require('express-validator');
const validatorMiddleware = require('../middlewares/validator');

exports.createAddTreasuryValidate = [
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

exports.updateAddTreasuryValidate = [
  check('treasuryId').isInt().withMessage('invalid addTreasury id'),
  body('amount').trim().not().isEmpty().withMessage('ادخل المبلغ'),
  body('date')
    .trim()
    .not()
    .isEmpty()
    .withMessage('اختر التاريخ'),
    // .isDate(),
    // .withMessage('تاريخ غير صالح'),
  body('note').trim().optional(),
  validatorMiddleware,
];

exports.getAddTreasuryValidate = [
  check('treasuryId').isInt().withMessage('invalid addTreasury id'),
  validatorMiddleware,
];

exports.deleteAddTreasuryValidate = [
  check('treasuryId').isInt().withMessage('invalid addTreasury id'),
  validatorMiddleware,
];
