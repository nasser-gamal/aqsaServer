const User = require('./userModel');
const Role = require('./roleModel');
const BankAccount = require('./bankAccountModel');
const Bank = require('./bankModel');
const Transaction = require('./transaction/transactionModel');
const Transfer = require('./transferModel');
const Category = require('./categoryModel');
const Segment = require('./segmentsModel');
const Commission = require('./commission/commissionModel');
const UserCommission = require('./commission/CommissionItems');
const Fees = require('./feesModel');
const Application = require('./applicationsModel');
const Provider = require('./providerModel');
const ProviderCommission = require('./providerCommission');
const AgentTreasury = require('./agentTreasuryModel');
const ProviderTreasury = require('./providerTreasuryModel');
const AddionalTreasury = require('./addionalTreasuryModel');

module.exports = {
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
};
