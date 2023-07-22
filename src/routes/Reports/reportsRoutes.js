const express = require('express');
const router = express.Router();

const reportsControllers = require('../../controllers/Reports/reportsControllers');
const links = require('../../links/links.js');

const auth = require('../../middlewares/auth.js');

router
  .route(links.reports.USER_TRANSACTION)
  .get(
    auth.isAuth,
    auth.checkUserRole(['superAdmin', 'admin']),
    reportsControllers.userReports
  );
router
  .route(links.reports.DAILY_TRANSACTION)
  .get(
    auth.isAuth,
    auth.checkUserRole(['superAdmin', 'admin']),
    reportsControllers.dailyReports
  );

router
  .route(links.reports.EMPLOY_TRANSACTION)
  .get(
    auth.isAuth,
    auth.checkUserRole(['superAdmin', 'admin']),
    reportsControllers.employReports
  );

router
  .route(links.reports.EXPORT_TRANSACTION)
  .get(
    auth.isAuth,
    auth.checkUserRole(['superAdmin', 'admin']),
    reportsControllers.exportExcel
  );

module.exports = router;
