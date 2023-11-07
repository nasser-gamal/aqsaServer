const bankAccountRepository = require('../dataAccess/banks/bankAccountRepository.js');
const transactionRepository = require('../dataAccess/transaction/transactionRepository.js');
const treasuryRepository = require('../dataAccess/treasury/treasuryRepository.js');

const { checkResourceExists } = require('./checkResourceExists.js');
const constants = require('./constants.js');

exports.isTransactionExists = async (query) => {
  const transaction = await transactionRepository.findOne(query);
  return checkResourceExists(transaction, constants.TRANSACTIONS_NOT_FOUND);
};

exports.findBankAccount = async (bankAccountId) => {
  const bankAccount = await bankAccountRepository.findById(bankAccountId);
  return checkResourceExists(bankAccount, constants.BANK_ACCOUNT_NOT_FOUND);
};

exports.updateBankAccount = async (bankAccount, amountTotal) => {
  let balanceBefore = Number(bankAccount.balance);
  const balanceAfter = balanceBefore + Number(amountTotal);

  await bankAccount.update({
    balance: balanceAfter,
  });
  return {
    balanceBefore,
    balanceAfter,
  };
};

exports.findTreasury = async () => {
  const treasury = treasuryRepository.findOne();
  return checkResourceExists(treasury, constants.TREASURY_NOT_FOUND);
};

exports.updateTreasury = async (treasury, amountTotal) => {
  await treasury.update({
    amountTotal,
  });
};

exports.profitStatus = (profit) => {
  let status;
  if (profit == 0) {
    status = 'لا يوجد ربح';
  } else if (profit > 0) {
    status = 'مكسب';
  } else {
    status = 'خسارة';
  }
  return status;
};

exports.updateTransactionInfo = async (
  transaction,
  amount,
  profit,
  isTotalRevenue,
  totalProviderDeduction,
  bankAccount
) => {
  let more = isTotalRevenue
    ? +amount - transaction.amountTotal 
    : +totalProviderDeduction - +transaction.providerDeduction;
  let balanceAfter = +transaction.balanceAfter - more;
  bankBalance = +bankAccount.balance - more;

  console.log('---- ', balanceAfter, '------', bankBalance, '--more', more);

  return { balanceAfter, bankBalance };
};
