const { body } = require('express-validator');
const validatorMiddleware = require('../middlewares/validator');

exports.loginValidate = [
  body('phoneNumber')
    .trim()
    .not()
    .isEmpty()
    .withMessage('ادخل رقم الهاتف')
    .isMobilePhone(['ar-EG'])
    .withMessage('رقم غير صالح'),
  body('password').trim().not().isEmpty().withMessage('ادخل كلمة المرور'),
  validatorMiddleware,
];
