import express from 'express';
const router = express.Router();

import * as rolePagesControllers from '../../controllers/permission/rolePagesControllers.js';
import links from '../../links/links.js';
import * as validate from '../../utils/validation.js';
import * as auth from '../../middlewares/auth.js';

// router
//   .route(links.permission.GET_PERMMISSIONS)
//   .get(rolePagesControllers.getAllPermmissisons);

router
  .route(links.rolePage.CREATE_ROLE_PAGE)
  .post(
    auth.isAuth,
    validate.permissionValidate,
    validate.validateInputs,
    rolePagesControllers.addRolePage
  );

// router
//   .route(links.permission.UPDATE_PERMMISSION)
//   .put(
//     auth.isAuth,
//     validate.permissionValidate,
//     validate.validateInputs,
//     rolePagesControllers.updatePermmission
//   );

// router
//   .route(links.permission.DELETE_PERMMISSION)
//   .delete(auth.isAuth, rolePagesControllers.deletePermmissison);

export default router;
