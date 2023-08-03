const express = require('express');
const router = express.Router();

const agentTreasuryControllers = require('../../controllers/agentTreasury/agentTreasuryControllers');
const links = require('../../links/links.js');

const auth = require('../../middlewares/auth.js');
const { checkActive } = require('../../middlewares/checkActive');
const validate = require('../../utils/validation.js');

router
  .route(links.agentTreasury.GET_AGENT_TREASURYS)
  .get(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    agentTreasuryControllers.getAllAgentTreasury
  );

router
  .route(links.agentTreasury.CREATE_AGENT_TREASURY)
  .post(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    validate.agentTreasuryValidate,
    validate.validateInputs,
    agentTreasuryControllers.createAgentTreasury
  );

router
  .route(links.agentTreasury.UPDATE_AGENT_TREASURY)
  .put(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    validate.agentTreasuryValidate,
    validate.validateInputs,
    agentTreasuryControllers.updateAgentTreasury
  );

router
  .route(links.agentTreasury.DELETE_AGENT_TREASURY)
  .delete(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    agentTreasuryControllers.deleteAgentTreasury
  );

module.exports = router;
