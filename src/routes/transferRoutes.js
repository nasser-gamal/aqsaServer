const express = require('express');
const router = express.Router();

const transferControllers = require('../controllers/transferControllers');
const links = require('../links/links.js');
const validate = require('../utils/validation.js');
const { protected, allowedTo, checkActive } = require('../middlewares/auth');

router.use(protected);
router.use(checkActive);
router.use(allowedTo(['superAdmin', 'admin']));

router.route('/').get(transferControllers.getTransfers);

router
  .route('/:transactionId')
  .get(transferControllers.getTransfer)
  .delete(transferControllers.deleteTransfer);

router
  .route(links.transaction.CREATE_TRANSACTION)
  .post(
    validate.transferValidate,
    validate.validateInputs,
    transferControllers.addTransfer
  );

router
  .route(links.transaction.UPDATE_TRANSFER)
  .put(
    validate.transferValidate,
    validate.validateInputs,
    transferControllers.updateTransfer
  );

module.exports = router;
