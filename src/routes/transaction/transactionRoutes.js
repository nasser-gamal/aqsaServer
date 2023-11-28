const express = require('express');
const router = express.Router();

const transactionControllers = require('../../controllers/transaction/transactionControllers.js');
const { protected, allowedTo, checkActive } = require('../../middlewares/auth');

router.use(protected);
router.use(checkActive);
router.use(allowedTo(['superAdmin', 'admin']));

router.route('/').get(transactionControllers.getAllTransactions);
router.get('/reports', transactionControllers.aggregation);

module.exports = router;
