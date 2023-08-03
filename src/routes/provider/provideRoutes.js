const express = require('express');
const router = express.Router();

const providerControllers = require('../../controllers/provider/providerControllers');
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
    providerControllers.getAllProviderss
  );

router
  .route(links.provider.CREATE_PROVIDER)
  .post(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    validate.providerValidate,
    validate.validateInputs,
    providerControllers.createProvider
  );

router
  .route(links.provider.UPDATE_PROVIDER)
  .put(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    validate.providerValidate,
    validate.validateInputs,
    providerControllers.updateProvider
  );

router
  .route(links.provider.DELETE_PROVIDER)
  .delete(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    providerControllers.deleteProvider
  );

module.exports = router;
