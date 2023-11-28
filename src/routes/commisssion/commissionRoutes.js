const express = require('express');
const router = express.Router();

const commissionControllers = require('../../controllers/commission/commissionControllers.js');
const links = require('../../links/links.js');
const validate = require('../../utils/validation.js');
const { protected, allowedTo, checkActive } = require('../../middlewares/auth');

router.get(
  '/me',
  protected,
  checkActive,
  allowedTo(['agent']),
  commissionControllers.getLoggedUserCommission
);

router
  .route(links.commission.GET_COMMISSIONS)
  .get(
    protected,
    checkActive,
    allowedTo(['superAdmin', 'admin']),
    commissionControllers.getUserCommission
  );

router
  .route(links.commission.GET_COMMISSION)
  .get(
    protected,
    checkActive,
    allowedTo(['superAdmin', 'admin']),
    commissionControllers.getCommission
  );

router
  .route(links.commission.CREATE_COMMISSION)
  .post(
    protected,
    checkActive,
    allowedTo(['superAdmin', 'admin']),
    commissionControllers.addCommission
  );

router
  .route(links.commission.UPDATE_COMMISSION)
  .put(
    protected,
    checkActive,
    allowedTo(['superAdmin', 'admin']),
    commissionControllers.updateCommission
  );

router
  .route(links.commission.DELETE_COMMISSION)
  .delete(
    protected,
    checkActive,
    allowedTo(['superAdmin', 'admin']),
    commissionControllers.deleteCommission
  );

module.exports = router;
