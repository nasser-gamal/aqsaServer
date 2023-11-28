const { body, check } = require('express-validator');
const validatorMiddleware = require('../middlewares/validator');
const { BankAccount, Bank } = require('../models');
const { NotFoundError, BadRequestError } = require('../utils/apiError');
const { Op } = require('sequelize');

exports.createBankAccountValidate = [
  body('accountName').trim().notEmpty().withMessage('اسم الحساب مطلوب'),
  body('bankId')
    .trim()
    .notEmpty()
    .withMessage('اسم البنك مطلوب')
    .isInt()
    .withMessage('id must be an integer')
    .custom(async (value, { req }) => {
      const bank = await Bank.findOne({
        where: { id: value },
      });
      if (!bank) throw new NotFoundError('البنك غير موجود');
      return true;
    }),
  body('bankNumber')
    .trim()
    .notEmpty()
    .withMessage('رقم الحساب مطلوب')
    .custom(async (value, { req }) => {
      const bankAccount = await BankAccount.findOne({
        where: { bankNumber: value },
      });
      if (bankAccount) throw new BadRequestError('رقم الحساب موجود بالفعل');
      return true;
    }),
  body('balance')
    .trim()
    .notEmpty()
    .withMessage('الرصيد مطلوب')
    .isNumeric()
    .withMessage('الرصيد يجب ان يكون رقما'),
  validatorMiddleware,
];

exports.updateBankAccountValidate = [
  check('bankAccountId')
    .isInt()
    .withMessage('invalid bankAccount id')
    .custom(async (value, { req }) => {
      const bankAccount = await BankAccount.findByPk(value);
      if (!bankAccount) throw new NotFoundError('الحساب غير موجود');
      return true;
    }),
  body('accountName').trim().notEmpty().withMessage('اسم الحساب مطلوب'),
  body('bankId')
    .notEmpty()
    .withMessage('اسم البنك مطلوب')
    .isInt()
    .withMessage('id must be an integer')
    .custom(async (value, { req }) => {
      const bank = await Bank.findOne({
        where: { id: value },
      });
      if (!bank) throw new NotFoundError('البنك غير موجود');
      return true;
    }),
  body('bankNumber')
    .trim()
    .notEmpty()
    .withMessage('رقم الحساب مطلوب')
    .custom(async (value, { req }) => {
      const bankAccount = await BankAccount.findOne({
        where: {
          [Op.and]: {
            id: { [Op.ne]: req.params.bankAccountId },
            bankNumber: value,
          },
        },
      });
      if (bankAccount) throw new BadRequestError('رقم الحساب موجود بالفعل');
      return true;
    }),
  body('balance')
    .trim()
    .notEmpty()
    .withMessage('الرصيد مطلوب')
    .isNumeric()
    .withMessage('الرصيد يجب ان يكون رقما'),
  validatorMiddleware,
];

exports.getBankAccountValidate = [
  check('bankAccountId').isInt().withMessage('invalid bankAccount id'),
  validatorMiddleware,
];

exports.deleteBankAccountValidate = [
  check('bankAccountId').isInt().withMessage('invalid bankAccount id'),
  validatorMiddleware,
];
