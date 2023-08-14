const User = require('./auth/userModel.js');
const Role = require('./auth/roleModel.js');
const BankAccount = require('./banks/bankAccountModel.js');
const Bank = require('./banks/bankModel.js');
const Transaction = require('./transaction/transactionModel.js');
const Transfer = require('./transaction/transferModel.js');
const Category = require('./category/categoryModel.js');
const Segment = require('./segments/segmentsModel.js');
const Commission = require('./commission/commissionModel.js');
const UserCommission = require('./commission/userCommission.js');
const Fees = require('./fees/feesModel.js');
const Application = require('./applications/applicationsModel.js');
const Provider = require('./provider/providerModel.js');
const ProviderCommission = require('./provider/providerCommission.js');
const AgentTreasury = require('./agentTreasury/agentTreasuryModel.js');
const ProviderTreasury = require('./providerTreasury/providerTreasuryModel.js');
const AddionalTreasury = require('./addionalTreasuy/addionalTreasuryModel.js');

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
