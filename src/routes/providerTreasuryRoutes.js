const express = require('express');
const router = express.Router();

const {
  createProviderTreasury,
  getProviderTreasuries,
  updateProviderTreasury,
  deleteProviderTreasury,
  getProviderTreasury,
} = require('../controllers/providerTreasuryControllers');

const {
  createProviderTreasuryValidator,
  getProviderTreasuryValidate,
  updateProviderTreasuryValidate,
  deleteProviderTreasuryValidate,
} = require('../validator/providerTreasuryValidator');

const { protected, allowedTo, checkActive } = require('../middlewares/auth');

router.use(protected);
router.use(checkActive);
router.use(allowedTo(['superAdmin', 'admin']));

router
  .route('/')
  .post(createProviderTreasuryValidator, createProviderTreasury)
  .get(getProviderTreasuries);

router
  .route('/:treasuryId')
  .get(getProviderTreasuryValidate, getProviderTreasury)
  .put(updateProviderTreasuryValidate, updateProviderTreasury)
  .delete(deleteProviderTreasuryValidate, deleteProviderTreasury);

module.exports = router;
