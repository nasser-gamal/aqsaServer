import express from 'express';
const router = express.Router();

import * as permissionControllers from '../../controllers/permission/permissionControllers.js';
import links from '../../links/links.js';
import * as validate from '../../utils/validation.js';
import * as auth from '../../middlewares/auth.js';

router
  .route(links.permission.GET_PERMMISSIONS)
  .get(permissionControllers.getAllPermmissisons);

// router
//   .route(links.permission.GET_SEGMENT)
//   .get(auth.isAuth, permissionControllers.getSegment);

router
  .route(links.permission.CREATE_PERMMISSION)
  .post(
    auth.isAuth,
    validate.permissionValidate,
    validate.validateInputs,
    permissionControllers.addPermmission
  );

router
  .route(links.permission.UPDATE_PERMMISSION)
  .put(
    auth.isAuth,
    validate.permissionValidate,
    validate.validateInputs,
    permissionControllers.updatePermmission
  );

router
  .route(links.permission.DELETE_PERMMISSION)
  .delete(auth.isAuth, permissionControllers.deletePermmissison);

export default router;
