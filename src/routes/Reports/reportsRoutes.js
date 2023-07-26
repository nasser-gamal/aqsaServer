const express = require('express');
const router = express.Router();

const reportsControllers = require('../../controllers/Reports/reportsControllers');
const links = require('../../links/links.js');

const auth = require('../../middlewares/auth.js');
const { checkActive } = require('../../middlewares/checkActive');

router
  .route(links.reports.USER_TRANSACTION)
  .get(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    reportsControllers.bankAccountReports
  );
router
  .route(links.reports.DAILY_TRANSACTION)
  .get(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    reportsControllers.dailyReports
  );

router
  .route(links.reports.EMPLOY_TRANSACTION)
  .get(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    reportsControllers.employReports
  );

router
  .route(links.reports.EXPORT_DAILY_TRANSACTION)
  .get(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    reportsControllers.exportDailyReports
  );

router
  .route(links.reports.EXPORT_BANK_TRANSACTION)
  .get(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    reportsControllers.exportBankAccountReports
  );

router
  .route(links.reports.EXPORT_EMPLOY_TRANSACTION)
  .get(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    reportsControllers.exportEmployReport
  );

router
  .route(links.reports.DAILY_TRANSFER)
  .get(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    reportsControllers.transferReports
  );

router
  .route(links.reports.EXPORT_TRANSFER_TRANSACTION)
  .get(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    reportsControllers.exportTransferReport
  );

module.exports = router;
