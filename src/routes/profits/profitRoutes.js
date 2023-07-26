const express = require('express');
const router = express.Router();

const profitsControllers = require('../../controllers/profits/profitsControllers');
const links = require('../../links/links.js');

const auth = require('../../middlewares/auth.js');
const { checkActive } = require('../../middlewares/checkActive');

router
  .route(links.profits.GET_DAILY_PROFITS)
  .get(
    auth.isAuth,
    checkActive,
    auth.checkUserRole(['superAdmin', 'admin']),
    profitsControllers.getDailyProfits
  );

module.exports = router;
