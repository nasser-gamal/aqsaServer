const express = require('express');
const router = express.Router();

const agentTreasuryControllers = require('../../controllers/agentTreasury/agentTreasuryControllers');
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
    agentTreasuryControllers.getAllAgentTreasury
  );

router
  .route(links.treasury.CREATE_TREASURY)
  .post(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    validate.treasuryValidate,
    validate.validateInputs,
    agentTreasuryControllers.createAgentTreasury
  );

router
  .route(links.treasury.UPDATE_TREASURY)
  .put(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    validate.treasuryValidate,
    validate.validateInputs,
    agentTreasuryControllers.updateAgentTreasury
  );

router
  .route(links.treasury.DELETE_TREASURY)
  .delete(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    agentTreasuryControllers.deleteAgentTreasury
  );

module.exports = router;
