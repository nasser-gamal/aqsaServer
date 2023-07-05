import express from 'express';
const router = express.Router();

import * as pageClaimControllers from '../../controllers/claims/pageclaimControllers.js';
import links from '../../links/links.js';
import * as validate from '../../utils/validation.js';
import * as auth from '../../middlewares/auth.js';

// router
//   .route(links.pageCalim.GET_PERMMISSIONS)
//   .get(pageClaimControllers.getAllPermmissisons);

router
  .route(links.pageCalim.CREATE_PAGE_CLAIM)
  .post(
    auth.isAuth,
    validate.claimsValidate,
    validate.validateInputs,
    pageClaimControllers.addPageClaim
  );

// router
//   .route(links.pageCalim.UPDATE_PERMMISSION)
//   .put(
//     auth.isAuth,
//     validate.claimsValidate,
//     validate.validateInputs,
//     pageClaimControllers.updatePermmission
//   );

// router
//   .route(links.pageCalim.DELETE_PERMMISSION)
//   .delete(auth.isAuth, pageClaimControllers.deletePermmissison);

export default router;
