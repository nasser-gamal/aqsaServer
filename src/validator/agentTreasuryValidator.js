const { body, check } = require('express-validator');
const validatorMiddleware = require('../middlewares/validator');

exports.createAgentTreasuryValidate = [
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

exports.updateAgentTreasuryValidate = [
  check('treasuryId').isInt().withMessage('invalid agentTreasury id'),
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

exports.getAgentTreasuryValidate = [
  check('treasuryId').isInt().withMessage('invalid agentTreasury id'),
  validatorMiddleware,
];

exports.deleteAgentTreasuryValidate = [
  check('treasuryId').isInt().withMessage('invalid agentTreasury id'),
  validatorMiddleware,
];
