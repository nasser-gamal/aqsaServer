const { body, check } = require('express-validator');
const Role = require('../models/roleModel');
const { BadRequestError } = require('../utils/apiError');
const { Op } = require('sequelize');
const validatorMiddleware = require('../middlewares/validator');

exports.createRoleValidator = [
  body('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('ادخل اسم الصلاحية')
    .custom(async (value, { req }) => {
      const role = await Role.findOne({ where: { name: value } });
      if (role) throw new BadRequestError('الصلاحية موجودة بالفعل');
      return true;
    }),
  body('nameAr').trim().not().isEmpty().withMessage('ادخل اسم الصلاحية'),
  validatorMiddleware,
];

exports.updateRoleValidate = [
  check('roleId').isInt().withMessage('invalid role id'),
  body('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('ادخل اسم الصلاحية')
    .custom(async (value, { req }) => {
      const role = await Role.findOne({
        where: {
          [Op.and]: {
            id: { [Op.ne]: req.params.roleId },
            name: value,
          },
        },
      });
      if (role) throw new BadRequestError('الصلاحية موجودة بالفعل');
      return true;
    }),
  body('nameAr').trim().not().isEmpty().withMessage('ادخل اسم الصلاحية'),
  validatorMiddleware,
];

exports.getRoleValidate = [
  check('roleId').isInt().withMessage('invalid role id'),
  validatorMiddleware,
];

exports.deleteRoleValidate = [
  check('roleId').isInt().withMessage('invalid role id'),
  validatorMiddleware,
];
