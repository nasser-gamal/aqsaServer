const express = require('express');
const router = express.Router();

const profitsControllers = require('../../controllers/profits/profitsControllers');
const links = require('../../links/links.js');
const { protected, allowedTo, checkActive } = require('../../middlewares/auth');


router
  .route(links.profits.GET_DAILY_PROFITS)
  .get(
    protected,
    checkActive,
    allowedTo(['superAdmin', 'admin']),
    profitsControllers.getDailyProfits
  );

module.exports = router;
