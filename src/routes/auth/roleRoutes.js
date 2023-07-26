const express = require('express');
const router = express.Router();

const roleControllers = require('../../controllers/auth/roleControllers.js');
const links = require('../../links/links.js');

const validate = require('../../utils/validation.js');
const auth = require('../../middlewares/auth.js');
const { checkActive } = require('../../middlewares/checkActive.js');

router
  .route(links.role.GET_ROLES)
  .get(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin']),
    roleControllers.getAllRoles
  );
router
  .route(links.role.CREATE_ROLE)
  .post(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin']),
    validate.roleValidate,
    validate.validateInputs,
    roleControllers.addRole
  );
router
  .route(links.role.UPDATE_ROLE)
  .put(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin']),
    validate.roleValidate,
    validate.validateInputs,
    roleControllers.updateRole
  );
router
  .route(links.role.DELETE_ROLE)
  .delete(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin']),
    roleControllers.deleteRole
  );

module.exports = router;
