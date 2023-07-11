const express = require('express');
const router = express.Router();

const commissionControllers = require('../../controllers/commission/commissionControllers.js');
const links = require('../../links/links.js');
const validate = require('../../utils/validation.js');
const auth = require('../../middlewares/auth.js');

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

module.exports = router;
