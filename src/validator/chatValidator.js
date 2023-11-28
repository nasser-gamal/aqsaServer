const { body } = require('express-validator');
const validatorMiddleware = require('../middlewares/validator');
const {  BadRequestError } = require('../utils/apiError');

exports.creatChatValidate = [
  body('name').trim().not().isEmpty().withMessage('ادخل اسم المجموعة'),
  body('isGroupChat')
    .trim()
    .not()
    .isEmpty()
    .withMessage('اختر نوع المحادثة')
    .isBoolean(),
  body('description').trim().optional(),
  body('users')
    .trim()
    .not()
    .isEmpty()
    .withMessage('اختر اعضاء المحادثة')
    .custom((value, { req }) => {
      if (value.length < 1) {
        throw new BadRequestError(
          'المجموعة يجب ان يكون لديها عضو واحد علي الأقل'
        );
      }
      return true;
    }),
  validatorMiddleware,
];
