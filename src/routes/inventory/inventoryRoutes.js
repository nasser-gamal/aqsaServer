const express = require('express');
const router = express.Router();

const inventoryControllers = require('../../controllers/inventory/inventoryControllers');
const links = require('../../links/links.js');
const { protected, allowedTo } = require('../../middlewares/auth.js');

router
  .route(links.inventory.GET_INVENTORY)
  .get(
    protected,
    allowedTo(['superAdmin', 'admin']),
    inventoryControllers.getInventroy
  );

module.exports = router;
