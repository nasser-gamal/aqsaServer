const express = require('express');
const router = express.Router();

const {
  createProvider,
  getProviders,
  getProvider,
  updateProvider,
  deleteProvider,
} = require('../controllers/providerControllers');

const { protected, allowedTo, checkActive } = require('../middlewares/auth');
const {
  createProviderValidate,
  updateProviderValidate,
  deleteProviderValidate,
  getProviderValidate,
} = require('../validator/providerValidator');

router.use(protected);
router.use(checkActive);
router.use(allowedTo(['superAdmin', 'admin']));

router
  .route('/')
  .post(createProviderValidate, createProvider)
  .get(getProviders);

router
  .route('/:providerId')
  .get(getProviderValidate, getProvider)
  .put(updateProviderValidate, updateProvider)
  .delete(deleteProviderValidate ,deleteProvider);

module.exports = router;
