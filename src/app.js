const express = require('express');
const app = express();

const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

const globlaError = require('./middlewares/errorHandler.js');
const { ApiError, NotFoundError } = require('./utils/apiError.js');
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
const Dues = require('./models/duesModel');
const { config } = require('./config/config.js');
const Chat = require('./models/chat/chat.js');
const Message = require('./models/messages/message.js');
const { connectDB } = require('./config/database.js');

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

const allowedOrigins = [config.client_URL_1, config.client_URL_2];

const corsOptions = {
   origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'DELETE', 'PUT'], // Specify the HTTP methods allowed
  optionsSuccessStatus: 204, // Respond with a 204 status for preflight requests
  credentials: true,
};
  // origin: config.client_URL,
  // credentials: true,

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', config.CLIENT_URL);
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/src/uploads', express.static(__dirname + '/' + 'uploads'));
app.use(cors(corsOptions));
app.use(morgan('tiny'));

app.use('/api', routes);

app.use('*', (req, res, next) => {
  throw new NotFoundError("cann't find this endpoint");
});
app.use(globlaError);

const PORT = config.app.port || 5000;

connectDB();

app.listen(PORT);

module.exports = app;
