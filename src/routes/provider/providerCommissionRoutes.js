const express = require('express');
const router = express.Router();

const providerCommissionControllers = require('../../controllers/provider/providerCommissionControllers');
const links = require('../../links/links.js');

const auth = require('../../middlewares/auth.js');
const { checkActive } = require('../../middlewares/checkActive');
const validate = require('../../utils/validation.js');

router
  .route(links.provider.GET_PROVIDERS)
  .get(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    providerCommissionControllers.getAllProviderCommissions
  );

router
  .route(links.provider.CREATE_PROVIDER)
  .post(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    validate.providerCommissionValidate,
    validate.validateInputs,
    providerCommissionControllers.createProviderCommission
  );

router
  .route(links.provider.UPDATE_PROVIDER)
  .put(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    validate.providerCommissionValidate,
    validate.validateInputs,
    providerCommissionControllers.updateProviderCommission
  );

router
  .route(links.provider.DELETE_PROVIDER)
  .delete(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    providerCommissionControllers.deleteProviderCommission
  );

module.exports = router;
