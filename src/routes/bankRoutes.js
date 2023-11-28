const express = require('express');
const router = express.Router();

const {
  createBank,
  getBanks,
  getBank,
  updateBank,
  deleteBank,
} = require('../controllers/bankControllers');
const { protected, allowedTo, checkActive } = require('../middlewares/auth');
const {
  createBankValidate,
  getBankValidate,
  updateBankValidate,
  deleteBankValidate,
} = require('../validator/bankValidator');


router.use(protected);
router.use(checkActive);
router.use(allowedTo(['superAdmin', 'admin']));

router.route('/').post(createBankValidate, createBank).get(getBanks);

router
  .route('/:bankId')
  .get(getBankValidate, getBank)
  .put(updateBankValidate, updateBank)
  .delete(deleteBankValidate, deleteBank);

module.exports = router;
