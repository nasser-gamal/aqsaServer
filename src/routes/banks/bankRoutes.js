import express from 'express';
const router = express.Router();

import links from '../../links/links.js';

import * as bankControllers from '../../controllers/banks/bankControllers.js';
import * as validate from '../../utils/validation.js';
import * as auth from '../../middlewares/auth.js';

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

export default router;
