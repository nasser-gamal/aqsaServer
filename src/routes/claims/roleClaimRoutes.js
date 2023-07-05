import express from 'express';
const router = express.Router();

import * as roleClaimControllers from '../../controllers/claims/roleClaimControllers.js';
import links from '../../links/links.js';
import * as validate from '../../utils/validation.js';
import * as auth from '../../middlewares/auth.js';

// router
//   .route(links.roleClaim.GET_PERMMISSIONS)
//   .get(roleClaimControllers.getAllPermmissisons);

router
  .route(links.roleClaim.CREATE_ROLE_CLAIM)
  .post(
    auth.isAuth,
    validate.claimsValidate,
    validate.validateInputs,
    roleClaimControllers.addRoleClaim
  );

// router
//   .route(links.roleClaim.UPDATE_PERMMISSION)
//   .put(
//     auth.isAuth,
//     validate.claimsValidate,
//     validate.validateInputs,
//     roleClaimControllers.updatePermmission
//   );

// router
//   .route(links.roleClaim.DELETE_PERMMISSION)
//   .delete(auth.isAuth, roleClaimControllers.deletePermmissison);

export default router;
