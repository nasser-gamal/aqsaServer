const { body, check } = require('express-validator');
const User = require('../models/userModel');
const { BadRequestError } = require('../utils/apiError');
const { Op } = require('sequelize');
const validatorMiddleware = require('../middlewares/validator');

exports.createUserValidate = [
  body('accountName').trim().not().isEmpty().withMessage('ادخل اسم الحساب'),
  body('userName').trim().not().isEmpty().withMessage('ادخل اسم صاحب الحساب'),
  body('email')
    .trim()
    .optional()
    .isEmail()
    .withMessage('بريد الكتروني غير صالح')
    .custom(async (value, { req }) => {
      const user = await User.findOne({ where: { email: value } });
      if (user) throw new BadRequestError('البريد مسجل من قبل');
      return true;
    }),
  body('phoneNumber')
    .trim()
    .not()
    .isEmpty()
    .withMessage('ادخل رقم الموبايل')
    .isMobilePhone(['ar-EG'])
    .withMessage('رقم غير صالح')
    .custom(async (value, { req }) => {
      const user = await User.findOne({ where: { phoneNumber: value } });
      if (user) throw new BadRequestError('رقم الهاتف مسجل من قبل');
      return true;
    }),
  body('nationalId')
    .trim()
    .optional()
    .isLength({ min: 14, max: 14 })
    .withMessage('الرقم القومي يجب أن يكون 14 رقم ')
    .isNumeric()
    .withMessage('الرقم القومي غير صالح'),
  body('address').trim().not().isEmpty().withMessage('ادخل  العنوان'),
  validatorMiddleware,
];

exports.updateUserValidate = [
  check('userId').isInt().withMessage('invalid user id'),
  body('accountName').trim().not().isEmpty().withMessage('ادخل اسم الحساب'),
  body('userName').trim().not().isEmpty().withMessage('ادخل اسم صاحب الحساب'),
  body('email')
    .trim()
    .optional()
    .isEmail()
    .withMessage('بريد الكتروني غير صالح')
    .custom(async (value, { req }) => {
      const user = await User.findOne({
        where: {
          [Op.and]: {
            id: { [Op.ne]: req.params.userId },
            email: value,
          },
        },
      });
      if (user) throw new BadRequestError('البريد مسجل من قبل');
      return true;
    }),
  body('phoneNumber')
    .trim()
    .not()
    .isEmpty()
    .withMessage('ادخل رقم الموبايل')
    .isMobilePhone(['ar-EG'])
    .withMessage('رقم غير صالح')
    .custom(async (value, { req }) => {
      const user = await User.findOne({
        where: {
          [Op.and]: {
            id: { [Op.ne]: req.params.userId },
            phoneNumber: value,
          },
        },
      });
      if (user) throw new BadRequestError('رقم الهاتف مسجل من قبل');
      return true;
    }),
  body('nationalId')
    .trim()
    .optional()
    .isLength({ min: 14, max: 14 })
    .withMessage('الرقم القومي يجب أن يكون 14 رقم ')
    .isNumeric()
    .withMessage('الرقم القومي غير صالح'),
  body('address').trim().not().isEmpty().withMessage('ادخل  العنوان'),
  validatorMiddleware,
];

exports.updateUserStatusValidate = [
  check('userId').isInt().withMessage('invalid user id'),
  validatorMiddleware,
];

exports.updatePasswordValidate = [
  check('userId').isInt().withMessage('invalid user id'),
  validatorMiddleware,
];

exports.updatePasswordManualValidate = [
  check('userId').isInt().withMessage('invalid user id'),
  body('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('ادخل  كلمة المرور')
    .isLength({ min: 6, max: 30 })
    .withMessage(' كلمة سر يجب ان تكون علي الاقل 8 حروف او 30 حرف علي الاكثر '),
  validatorMiddleware,
];

exports.getUserValidate = [
  check('userId').isInt().withMessage('invalid user id'),
  validatorMiddleware,
];

exports.getUserValidate = [
  check('userId').isInt().withMessage('invalid user id'),
  validatorMiddleware,
];

exports.deleteUserValidate = [
  check('userId').isInt().withMessage('invalid user id'),
  validatorMiddleware,
];
