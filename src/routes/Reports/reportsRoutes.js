const express = require('express');
const router = express.Router();

const reportsControllers = require('../../controllers/Reports/reportsControllers');
const links = require('../../links/links.js');

const { protected, allowedTo, checkActive } = require('../../middlewares/auth');


router
  .route(links.reports.USER_TRANSACTION)
  .get(
    protected,
    checkActive,
    allowedTo(['superAdmin', 'admin']),
    reportsControllers.bankAccountReports
  );
router
  .route(links.reports.DAILY_TRANSACTION)
  .get(
    protected,
    checkActive,
    allowedTo(['superAdmin', 'admin']),
    reportsControllers.dailyReports
  );

router
  .route(links.reports.EMPLOY_TRANSACTION)
  .get(
    protected,
    checkActive,
    allowedTo(['superAdmin', 'admin']),
    reportsControllers.employReports
  );

router
  .route(links.reports.EXPORT_DAILY_TRANSACTION)
  .get(
    protected,
    checkActive,
    allowedTo(['superAdmin', 'admin']),
    reportsControllers.exportDailyReports
  );

router
  .route(links.reports.EXPORT_BANK_TRANSACTION)
  .get(
    protected,
    checkActive,
    allowedTo(['superAdmin', 'admin']),
    reportsControllers.exportBankAccountReports
  );

router
  .route(links.reports.EXPORT_EMPLOY_TRANSACTION)
  .get(
    protected,
    checkActive,
    allowedTo(['superAdmin', 'admin']),
    reportsControllers.exportEmployReport
  );

router
  .route(links.reports.DAILY_TRANSFER)
  .get(
    protected,
    checkActive,
    allowedTo(['superAdmin', 'admin']),
    reportsControllers.transferReports
  );

router
  .route(links.reports.EXPORT_TRANSFER_TRANSACTION)
  .get(
    protected,
    checkActive,
    allowedTo(['superAdmin', 'admin']),
    reportsControllers.exportTransferReport
  );

router
  .route(links.reports.DAILY_FEES)
  .get(
    protected,
    checkActive,
    allowedTo(['superAdmin', 'admin']),
    reportsControllers.feesReports
  );

router
  .route(links.reports.DAILY_COMMISSIONS)
  .get(
    protected,
    checkActive,
    allowedTo(['superAdmin', 'admin']),
    reportsControllers.userCommissionReports
  );

module.exports = router;
