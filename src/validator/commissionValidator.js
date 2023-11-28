const AgentCommission = require('../models/commission/agentCommission');
const { BadRequestError } = require('../utils/apiError');
const validatorMiddleware = require('../middlewares/validator');

const { body } = require('express-validator');

exports.createCommissionValidate = [
  body('agentId')
    .notEmpty()
    .withMessage('اختر الوكيل')
    .custom(async (value, { req }) => {
      const agentCommission = await AgentCommission.findOne({
        where: { agentId: value, month: req.body.month, year: req.body.year },
      });

      if (agentCommission) throw new BadRequestError('تم ادخال العمولة من قبل');
      return true;
    }),
  validatorMiddleware,
];
