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

const {
  User,
  Role,
  BankAccount,
  Bank,
  Transaction,
  Transfer,
  Category,
  Segment,
  Commission,
  UserCommission,
  Fees,
  Application,
  Provider,
  ProviderCommission,
  AgentTreasury,
  ProviderTreasury,
  AddionalTreasury,
} = require('./models/index.js');
const Dues = require('./models/dues/duesModel.js');
const logger = require('./config/logger.js');

const PORT = process.env.PORT || 3000;

User.belongsTo(Role);
Role.hasMany(User);

BankAccount.belongsTo(Bank);
Bank.hasMany(BankAccount);

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

UserCommission.belongsTo(User, {
  foreignKey: 'agentId',
  as: 'agent',
});

UserCommission.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'creator',
});

Commission.belongsTo(Segment, {
  foreignKey: 'segmentId',
  as: 'segment',
});

UserCommission.hasMany(Commission);
Commission.belongsTo(UserCommission);

Fees.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'creator',
});

Application.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'creator',
});

Provider.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'creator',
});

ProviderCommission.belongsTo(Provider, {
  foreignKey: 'providerId',
  as: 'provider',
});

ProviderCommission.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'creator',
});

AgentTreasury.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'creator',
});

ProviderTreasury.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'creator',
});

AddionalTreasury.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'creator',
});

Dues.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'creator',
});

const corsOptions = {
  // origin: process.env.CLIENT_URL,
  origin: '*',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/uploads', express.static('uploads'));
app.use(cors(corsOptions));
app.use(morgan('tiny'));

app.use('/api', routes);

app.use('*', (req, res, next) => {
  next(new ApiError("cann't find this endpoint"));
});
app.use(errorHandler);

sequelize
  .sync()
  .then((result) => {
    app.listen(PORT);
    logger.log('info', 'Server is Running');
  })
  .catch((err) => console.log(err));

module.exports = app;
