const express = require('express');
const router = express.Router();

const links = require('../../links/links.js');

const bankControllers = require('../../controllers/banks/bankControllers.js');
const validate = require('../../utils/validation.js');
const auth = require('../../middlewares/auth.js');

router
  .route(links.bank.GET_BANKS)
  .get(auth.isAuth, bankControllers.getAllBanks);

router.route(links.bank.GET_BANK).get(auth.isAuth, bankControllers.getBank);
router
  .route(links.bank.CREATE_BANK)
  .post(
    auth.isAuth,
    validate.bankValidate,
    validate.validateInputs,
    bankControllers.createBank
  );

router
  .route(links.bank.UPDATE_BANK)
  .put(
    auth.isAuth,
    validate.bankValidate,
    validate.validateInputs,
    bankControllers.updateBank
  );

router
  .route(links.bank.DELETE_BANK)
  .delete(auth.isAuth, bankControllers.deleteBank);

module.exports = router;
