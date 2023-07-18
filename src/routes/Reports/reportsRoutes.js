const express = require('express');
const router = express.Router();

const reportsControllers = require('../../controllers/Reports/reportsControllers');
const links = require('../../links/links.js');

const auth = require('../../middlewares/auth.js');

router
  .route(links.reports.DAILY_TRANSACTION)
  .get(reportsControllers.dailyReports);

router
  .route(links.reports.EXPORT_TRANSACTION)
  .post(reportsControllers.exportExcel);

module.exports = router;
