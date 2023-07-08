import express from 'express';
const router = express.Router();

import * as commissionControllers from '../../controllers/commission/commissionControllers.js';
import links from '../../links/links.js';
import * as validate from '../../utils/validation.js';
import * as auth from '../../middlewares/auth.js';

router
  .route(links.commission.GET_COMMISSIONS)
  .get(
    auth.isAuth,
    auth.checkUserRole(['superAdmin', 'admin']),
    commissionControllers.getAllCommissions
  );

router
  .route(links.commission.GET_COMMISSION)
  .get(
    auth.isAuth,
    auth.checkUserRole(['superAdmin', 'admin']),
    commissionControllers.getCommission
  );

router
  .route(links.commission.CREATE_COMMISSION)
  .post(
    auth.isAuth,
    auth.checkUserRole(['superAdmin', 'admin']),
    commissionControllers.addCommission
  );

router
  .route(links.commission.UPDATE_COMMISSION)
  .put(
    auth.isAuth,
    auth.checkUserRole(['superAdmin', 'admin']),
    commissionControllers.updateCommission
  );

router
  .route(links.commission.DELETE_COMMISSION)
  .delete(
    auth.isAuth,
    auth.checkUserRole(['superAdmin', 'admin']),
    commissionControllers.deleteCommission
  );

export default router;
