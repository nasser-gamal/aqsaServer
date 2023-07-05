import express from 'express';
const router = express.Router();

import * as roleControllers from '../../controllers/auth/roleControllers.js';
import links from '../../links/links.js';

import * as validate from '../../utils/validation.js';
import * as auth from '../../middlewares/auth.js';

router
  .route(links.role.GET_ROLES)
  .get(auth.isAuth, roleControllers.getAllRoles);
router
  .route(links.role.CREATE_ROLE)
  .post(
    auth.isAuth,
    validate.roleValidate,
    validate.validateInputs,
    roleControllers.addRole
  );
router
  .route(links.role.UPDATE_ROLE)
  .put(
    auth.isAuth,
    validate.roleValidate,
    validate.validateInputs,
    roleControllers.updateRole
  );
router
  .route(links.role.DELETE_ROLE)
  .delete(auth.isAuth, roleControllers.deleteRole);

export default router;
