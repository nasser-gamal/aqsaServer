import express from 'express';
const app = express();

import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

import errorHandler from './middlewares/errorHandler.js';
import ApiError from './utils/apiError.js';
import sequelize from './config/database.js';

import routes from './routes/index.js';

import User from './models/auth/userModel.js';
import Role from './models/auth/roleModel.js';
import BankAccount from './models/banks/bankAccountModel.js';
import Bank from './models/banks/bankModel.js';
import Transaction from './models/transaction/transactionModel.js';
import Transfer from './models/transaction/transferModel.js';
import Category from './models/category/categoryModel.js';
import Segment from './models/segments/segmentsModel.js';
import Commission from './models/commission/commissionModel.js';

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Access-Control-Allow-Credentials',
  ],
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
app.use(cors(corsOptions));
app.use(morgan('tiny'));

User.belongsTo(Role);
Role.hasMany(User);

BankAccount.belongsTo(Bank);
Bank.hasMany(BankAccount);

// Pages.belongsTo(SystemMenu);
// SystemMenu.hasMany(Pages);
// RolePage.belongsTo(Role);
// Role.hasMany(RolePage);

// RolePage.belongsTo(SystemMenu);
// SystemMenu.hasMany(RolePage);

// RoleClaim.belongsTo(PageClaim);
// PageClaim.hasMany(RoleClaim);

// RoleClaim.belongsTo(Role);
// Role.hasMany(RoleClaim);

// PageClaim.belongsTo(SystemMenu);
// SystemMenu.hasMany(PageClaim);

Transaction.belongsTo(BankAccount);
BankAccount.hasMany(Transaction);

Transaction.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'creator',
});

User.hasMany(Transaction, {
  foreignKey: 'createdBy',
  as: 'transactions',
});

Transfer.belongsTo(BankAccount, {
  foreignKey: 'senderId',
  as: 'sender',
});

Transfer.belongsTo(BankAccount, {
  foreignKey: 'recipientId',
  as: 'recipient',
});

Transfer.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'creator',
});

Category.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'creator',
});

Segment.belongsTo(Category, {
  foreignKey: 'serviceId',
  as: 'service',
});

Segment.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'creator',
});

Commission.belongsTo(User, {
  foreignKey: 'agentId',
  as: 'agent',
});

Commission.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'creator',
});

Commission.belongsTo(Segment, {
  foreignKey: 'segmentId',
  as: 'segment',
});

app.use('/api', routes);

app.use('*', (req, res, next) => {
  next(new ApiError("cann't find this endpoint"));
});
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
sequelize
  .sync()
  .then((result) => {
    app.listen(PORT);
  })
  .catch((err) => console.log(err));
