import express from 'express';
const router = express.Router();

// Import route files
import roleRoutes from './auth/roleRoutes.js';
import userRoutes from './auth/userRoutes.js';
import agentRoutes from './auth/agentRoutes.js';
import authRoutes from './auth/authRoutes.js';
// import systemMenuRoutes from './links/systemMenuRoutes.js';
// import pagesRoutes from './links/pagesRoutes.js';
// import pageClaimRoutes from './claims/pageClaimRoutes.js';
// import rolePagesRoutes from './permmission/rolePagesRoutes.js';
import categoryRoutes from './category/categoryRoutes.js';
import segmentRoutes from './segment/segmentRoutes.js';
import bankAccountsRoutes from './banks/bankAccountRoutes.js';
import bankRoutes from './banks/bankRoutes.js';
import transactionRoutes from './transaction/transactionRoutes.js';
import depositeRoutes from './transaction/depositeRoutes.js';
import withdrawRoutes from './transaction/withdrawRoutes.js';
import transferRoutes from './transaction/transferRoutes.js';
import commissionRoutes from './commisssion/commissionRoutes.js';

router.use('/role', roleRoutes);
router.use('/user', userRoutes);
router.use('/agent', agentRoutes);
router.use('/auth', authRoutes);
// router.use('/links', systemMenuRoutes);
// router.use('/pages', pagesRoutes);
// router.use('/pageClaim', pageClaimRoutes);
// router.use('/roleMenu', rolePagesRoutes);
router.use('/category', categoryRoutes);
router.use('/segment', segmentRoutes);
router.use('/banks', bankRoutes);
router.use('/bank-accounts', bankAccountsRoutes);
router.use('/transaction', transactionRoutes);
router.use('/transaction/deposite', depositeRoutes);
router.use('/transaction/withdraw', withdrawRoutes);
router.use('/transaction/transfer', transferRoutes);
router.use('/commission', commissionRoutes);

export default router;