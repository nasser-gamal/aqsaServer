const { body, check } = require('express-validator');
const validatorMiddleware = require('../middlewares/validator');
const { Bank } = require('../models');
const {  BadRequestError } = require('../utils/apiError');
const { Op } = require('sequelize');

exports.createBankValidate = [
  body('bankName')
    .trim()
    .notEmpty()
    .withMessage('اسم البنك مطلوب')
    .custom(async (value, { req }) => {
      const bank = await Bank.findOne({ where: { bankName: value } });
      if (bank) throw new BadRequestError('البنك موجود');
      return true;
    }),
  body('note').trim().optional(),
  validatorMiddleware,
];

exports.updateBankValidate = [
  check('bankId').isInt().withMessage('invalid bank id'),
  body('bankName')
    .trim()
    .notEmpty()
    .withMessage('اسم البنك مطلوب')
    .custom(async (value, { req }) => {
      const bank = await Bank.findOne({
        where: {
          [Op.and]: {
            id: { [Op.ne]: req.params.bankId },
            bankName: value,
          },
        },
      });
      if (bank) throw new BadRequestError('البنك موجود');
      return true;
    }),
  body('note').trim().optional(),
  validatorMiddleware,
];

exports.getBankValidate = [
  check('bankId').isInt().withMessage('invalid bank id'),
  validatorMiddleware,
];
exports.deleteBankValidate = [
  check('bankId').isInt().withMessage('invalid bank id'),
  validatorMiddleware,
];
