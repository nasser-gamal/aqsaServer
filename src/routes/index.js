const express = require('express');
const router = express.Router();

// Import route files
// const systemMenuRoutes = require('./links/systemMenuRoutes.js');
// const pagesRoutes = require('./links/pagesRoutes.js');
// const pageClaimRoutes = require('./claims/pageClaimRoutes.js');
// const rolePagesRoutes = require('./permmission/rolePagesRoutes.js');
const roleRoutes = require('./auth/roleRoutes.js');
const userRoutes = require('./auth/userRoutes.js');
const agentRoutes = require('./auth/agentRoutes.js');
const authRoutes = require('./auth/authRoutes.js');
const categoryRoutes = require('./category/categoryRoutes.js');
const segmentRoutes = require('./segment/segmentRoutes.js');
const treasuryRoutes = require('./treasury/treasuryRoutes.js');
const bankAccountsRoutes = require('./banks/bankAccountRoutes.js');
const bankRoutes = require('./banks/bankRoutes.js');
const transactionRoutes = require('./transaction/transactionRoutes.js');
const depositeRoutes = require('./transaction/depositeRoutes.js');
const withdrawRoutes = require('./transaction/withdrawRoutes.js');
const transferRoutes = require('./transaction/transferRoutes.js');
const commissionRoutes = require('./commisssion/commissionRoutes.js');
const inventoryRoutes = require('./inventory/inventoryRoutes.js');
const reportsRoutes = require('./Reports/reportsRoutes.js');

// router.use('/links', systemMenuRoutes);
// router.use('/pages', pagesRoutes);
// router.use('/pageClaim', pageClaimRoutes);
// router.use('/roleMenu', rolePagesRoutes);

router.use('/role', roleRoutes);
router.use('/user', userRoutes);
router.use('/agent', agentRoutes);
router.use('/auth', authRoutes);
router.use('/category', categoryRoutes);
router.use('/segment', segmentRoutes);
router.use('/treasury', treasuryRoutes);
router.use('/banks', bankRoutes);
router.use('/bank-accounts', bankAccountsRoutes);
router.use('/transaction', transactionRoutes);
router.use('/transaction/deposite', depositeRoutes);
router.use('/transaction/withdraw', withdrawRoutes);
router.use('/transaction/transfer', transferRoutes);
router.use('/commission', commissionRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/reports', reportsRoutes);

module.exports = router;
