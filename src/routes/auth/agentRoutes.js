const express = require('express');
const router = express.Router();

const agentControllers = require('../../controllers/auth/agentControllers.js');
const validate = require('../../utils/validation.js');
const links = require('../../links/links.js');
const auth = require('../../middlewares/auth.js');
const { checkPassword } = require('../../middlewares/checkPassword.js');
const { checkActive } = require('../../middlewares/checkActive.js');

router
  .route(links.user.GET_USERS)
  .get(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    agentControllers.getAllAgents
  );
router
  .route(links.user.CREATE_USER)
  .post(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin']),
    validate.userValidate,
    validate.agentValidate,
    validate.validateInputs,
    agentControllers.addAgent
  );

router
  .route(links.user.UPDATE_USER)
  .put(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin']),
    validate.updateUserValidate,
    validate.agentValidate,
    validate.validateInputs,
    agentControllers.updateAgent
  );
router
  .route(links.user.UPDATE_PASSWORD)
  .put(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin']),
    validate.passwordValidate,
    validate.validateInputs,
    checkPassword,
    agentControllers.updatePassword
  );

router
  .route(links.user.UPDATE_PASSWORD_MANUAL)
  .put(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin']),
    validate.passwordValidate,
    validate.validateInputs,
    agentControllers.updatePasswordManual
  );

router
  .route(links.user.UPDATE_STATUS)
  .put(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin']),
    agentControllers.updateUserStatus
  );
router
  .route(links.user.DELETE_USER)
  .delete(
    checkPassword,
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin']),
    agentControllers.deleteAgent
  );

module.exports = router;
