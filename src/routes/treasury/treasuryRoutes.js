const express = require('express');
const router = express.Router();

const treasuryControllers = require('../../controllers/treasury/treasuryControllers');
const links = require('../../links/links.js');
const auth = require('../../middlewares/auth.js');

router
  .route(links.treasury.GET_TREASURY)
  .get(
    auth.isAuth,
    auth.checkUserRole(['superAdmin', 'admin']),
    treasuryControllers.findTreasury
  );


module.exports = router;
