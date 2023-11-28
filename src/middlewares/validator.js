const { validationResult } = require("express-validator");
const { BadRequestError } = require("../utils/apiError");

const validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  console.log(req.body)
  if (!errors.isEmpty()) {
    throw new BadRequestError(errors.array()[0].msg);
    // return res.status(400).json({ message: errors.array()[0].msg });
  }
  next();
};


module.exports = validatorMiddleware;