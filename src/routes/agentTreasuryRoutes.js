const express = require('express');
const router = express.Router();

const {
  getAgentTreasuries,
  createAgentTreasury,
  updateAgentTreasury,
  deleteAgentTreasury,
  getAgentTreasury,
} = require('../controllers/agentTreasuryControllers');

const { protected, allowedTo, checkActive } = require('../middlewares/auth');
const {
  createAgentTreasuryValidate,
  getAgentTreasuryValidate,
  updateAgentTreasuryValidate,
  deleteAgentTreasuryValidate,
} = require('../validator/agentTreasuryValidator');

router.use(protected);
router.use(checkActive);
router.use(allowedTo(['superAdmin', 'admin']));

router
  .route('/')
  .get(getAgentTreasuries)
  .post(createAgentTreasuryValidate, createAgentTreasury);

router
  .route('/:treasuryId')
  .get(getAgentTreasuryValidate, getAgentTreasury)
  .put(updateAgentTreasuryValidate, updateAgentTreasury)
  .delete(deleteAgentTreasuryValidate, deleteAgentTreasury);

module.exports = router;
