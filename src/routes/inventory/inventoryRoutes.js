const express = require('express');
const router = express.Router();

const inventoryControllers = require('../../controllers/inventory/inventoryControllers');
const links = require('../../links/links.js');
const auth = require('../../middlewares/auth.js');

router
  .route(links.inventory.GET_INVENTORY)
  .get(
    auth.isAuth,
    auth.checkUserRole(['superAdmin', 'admin']),
    inventoryControllers.getInventroy
  );

module.exports = router;
