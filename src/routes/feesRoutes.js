const express = require('express');
const router = express.Router();

const {
  createFee,
  getFees,
  getFee,
  updateFee,
  deleteFee,
} = require('../controllers/feesControllers');

const { protected, allowedTo, checkActive } = require('../middlewares/auth.js');
const {
  createFeesValidator,
  getFeeValidate,
  deleteFeeValidate,
  updateFeesValidate,
} = require('../validator/feesValidator.js');

router.use(protected);
router.use(checkActive);
router.use(allowedTo(['superAdmin', 'admin']));

router.route('/').get(getFees).post(createFeesValidator, createFee);

router
  .route('/:feesId')
  .get(getFeeValidate, getFee)
  .put(updateFeesValidate, updateFee)
  .delete(deleteFeeValidate, deleteFee);

module.exports = router;
