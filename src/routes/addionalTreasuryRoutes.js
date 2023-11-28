const express = require('express');
const router = express.Router();

const {
  createAddTreasury,
  getAddTreasuries,
  getAddTreasury,
  updateAddTreasury,
  deleteAddTreasury,
} = require('../controllers/addionalTreasuryControllers.js');

const { protected, allowedTo, checkActive } = require('../middlewares/auth.js');
const {
  createAddTreasuryValidate,
  getAddTreasuryValidate,
  updateAddTreasuryValidate,
  deleteAddTreasuryValidate,
} = require('../validator/addionalTreasuryValidator.js');

router.use(protected);
router.use(checkActive);
router.use(allowedTo(['superAdmin', 'admin']));

router
  .route('/')
  .get(getAddTreasuries)
  .post(createAddTreasuryValidate, createAddTreasury);

router
  .route('/:treasuryId')
  .get(getAddTreasuryValidate, getAddTreasury)
  .put(updateAddTreasuryValidate, updateAddTreasury)
  .delete(deleteAddTreasuryValidate, deleteAddTreasury);

module.exports = router;
