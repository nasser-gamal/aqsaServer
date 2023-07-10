const express = require('express');
const app = express();

const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

const errorHandler = require('./middlewares/errorHandler.js');
const ApiError = require('./utils/apiError.js');
const sequelize = require('./config/database.js');

const routes = require('./routes/index.js');

const User = require('./models/auth/userModel.js');
const Role = require('./models/auth/roleModel.js');
const BankAccount = require('./models/banks/bankAccountModel.js');
const Bank = require('./models/banks/bankModel.js');
const Transaction = require('./models/transaction/transactionModel.js');
const Transfer = require('./models/transaction/transferModel.js');
const Category = require('./models/category/categoryModel.js');
const Segment = require('./models/segments/segmentsModel.js');
const Commission = require('./models/commission/commissionModel.js');

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

app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

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

const PORT = process.env.PORT || 3000;

sequelize
  .sync()
  .then((result) => {
    app.listen(PORT);
  })
  .catch((err) => console.log(err));
