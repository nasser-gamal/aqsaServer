const express = require('express');
const router = express.Router();

const agentControllers = require('../../controllers/auth/agentControllers.js');
const validate = require('../../utils/validation.js');
const links = require('../../links/links.js');
const { protected, allowedTo, checkActive } = require('../../middlewares/auth');
const { checkPassword } = require('../../middlewares/checkPassword.js');

router.route(links.user.GET_USERS).get(agentControllers.getAllAgents);
router
  .route(links.user.CREATE_USER)
  .post(
    protected,
    checkActive,
    allowedTo(['superAdmin']),
    validate.userValidate,
    validate.agentValidate,
    validate.validateInputs,
    agentControllers.addAgent
  );

router
  .route(links.user.UPDATE_USER)
  .put(
    protected,
    checkActive,
    allowedTo(['superAdmin']),
    validate.updateUserValidate,
    validate.agentValidate,
    validate.validateInputs,
    agentControllers.updateAgent
  );
router
  .route(links.user.UPDATE_PASSWORD)
  .put(
    protected,
    checkActive,
    allowedTo(['superAdmin']),
    validate.passwordValidate,
    validate.validateInputs,
    checkPassword,
    agentControllers.updatePassword
  );

router
  .route(links.user.UPDATE_PASSWORD_MANUAL)
  .put(
    protected,
    checkActive,
    allowedTo(['superAdmin']),
    validate.passwordValidate,
    validate.validateInputs,
    agentControllers.updatePasswordManual
  );

router
  .route(links.user.UPDATE_STATUS)
  .put(
    protected,
    checkActive,
    allowedTo(['superAdmin']),
    agentControllers.updateUserStatus
  );
router
  .route(links.user.DELETE_USER)
  .delete(
    checkPassword,
    protected,
    checkActive,
    allowedTo(['superAdmin']),
    agentControllers.deleteAgent
  );

module.exports = router;
