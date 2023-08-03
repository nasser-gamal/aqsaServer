const express = require('express');
const router = express.Router();

const addionalTreasuryControllers = require('../../controllers/addionalTreasury/addionalTreasuryControllers');
const links = require('../../links/links.js');

const auth = require('../../middlewares/auth.js');
const { checkActive } = require('../../middlewares/checkActive');
const validate = require('../../utils/validation.js');

router
  .route(links.treasury.GET_TREASURYS)
  .get(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    addionalTreasuryControllers.getAllAddionalTreasury
  );

router
  .route(links.treasury.CREATE_TREASURY)
  .post(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    validate.treasuryValidate,
    validate.validateInputs,
    addionalTreasuryControllers.createAddionalTreasury
  );

router
  .route(links.treasury.UPDATE_TREASURY)
  .put(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    validate.treasuryValidate,
    validate.validateInputs,
    addionalTreasuryControllers.updateAddionalTreasury
  );

router
  .route(links.treasury.DELETE_TREASURY)
  .delete(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    addionalTreasuryControllers.deleteAddionalTreasury
  );

module.exports = router;
