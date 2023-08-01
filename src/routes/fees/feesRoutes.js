const express = require('express');
const router = express.Router();

const feesControllers = require('../../controllers/fees/feesControllers');
const links = require('../../links/links.js');

const auth = require('../../middlewares/auth.js');
const { checkActive } = require('../../middlewares/checkActive');
const validate = require('../../utils/validation.js');

router
  .route(links.fees.GET_FEES)
  .get(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    feesControllers.getAllFees
  );

router
  .route(links.fees.CREATE_FEE)
  .post(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    validate.feessValidate,
    validate.validateInputs,
    feesControllers.createFee
  );

router
  .route(links.fees.UPDATE_FEE)
  .put(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    feesControllers.updateFee
  );

router
  .route(links.fees.DELETE_FEE)
  .delete(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    feesControllers.deleteFee
  );

module.exports = router;
