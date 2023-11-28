const { body, check } = require('express-validator');
const validatorMiddleware = require('../middlewares/validator');
const { Op } = require('sequelize');
const Provider = require('../models/providerModel');
const { BadRequestError } = require('../utils/apiError');

exports.createProviderValidate = [
  body('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('اختر اسم المزود')
    .custom(async (value, { req }) => {
      const provider = await Provider.findOne({ where: { name: value } });
      if (provider) throw new BadRequestError('المزود موجود');
      return true;
    }),
  body('note').trim().optional(),
  validatorMiddleware,
];

exports.updateProviderValidate = [
  check('providerId').isInt().withMessage('invalid provider id'),
  body('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('اختر اسم المزود')
    .custom(async (value, { req }) => {
      const provider = await Provider.findOne({
        where: {
          [Op.and]: {
            id: { [Op.ne]: req.params.providerId },
            name: value,
          },
        },
      });
      if (provider) throw new BadRequestError('المزود موجود');
      return true;
    }),
  body('note').trim().optional(),
  validatorMiddleware,
];

exports.getProviderValidate = [
  check('providerId').isInt().withMessage('invalid provider id'),
  validatorMiddleware,
];

exports.deleteProviderValidate = [
  check('providerId').isInt().withMessage('invalid provider id'),
  validatorMiddleware,
];
