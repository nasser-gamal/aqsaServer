const express = require('express');
const router = express.Router();

const {
  createProviderCommission,
  getProviderCommissions,
  getProviderCommission,
  updateProviderCommission,
  deleteProviderCommission,
} = require('../controllers/providerCommissionControllers');

const { protected, allowedTo, checkActive } = require('../middlewares/auth.js');
const {
  createProviderCommValidate,
  getProviderCommValidate,
  updateProviderCommValidate,
  deleteProviderCommValidate,
} = require('../validator/providerCommValidator.js');

router.use(protected);
router.use(checkActive);
router.use(allowedTo(['superAdmin', 'admin']));

router
  .route('/')
  .get(getProviderCommissions)
  .post(createProviderCommValidate, createProviderCommission)

router
  .route('/:providerCommId')
  .get(getProviderCommValidate, getProviderCommission)
  .put(updateProviderCommValidate, updateProviderCommission)
  .delete(deleteProviderCommValidate, deleteProviderCommission);

module.exports = router;
