const express = require('express');
const router = express.Router();

const inventoryControllers = require('../../controllers/inventory/inventory.Controllers');
const links = require('../../links/links.js');
const auth = require('../../middlewares/auth.js');

router
  .route(links.inventory.GET_PROFITES)
  .get(
    // auth.isAuth,
    // auth.checkUserRole(['superAdmin', 'admin']),
    inventoryControllers.getProfits
  );

module.exports = router;
