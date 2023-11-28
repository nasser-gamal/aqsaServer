const transactionRepository = require('../../dataAccess/transaction/transactionRepository.js');

const transactionServicesUtils = require('../../utils/transactionServicesUtils.js');

const constants = require('../../utils/constants.js');
const { createDoc, updateDoc, getDoc } = require('../factory.js');
const { Transaction, BankAccount } = require('../../models/index.js');

const calcDeposite = (
  isPercentage,
  amount,
  providerFees,
  providerPercentage
) => {
  let amountTotal = Number(amount).toFixed(2);

  let providerRevenue = isPercentage
    ? (providerPercentage / 100) * amountTotal
    : providerPercentage;

  let profit = (+providerRevenue - +providerFees).toFixed(2);
  let totalProviderDeduction = (amountTotal - profit).toFixed(2);

  return {
    amountTotal,
    totalProviderDeduction,
    profit,
    providerRevenue,
  };
};

exports.addDeposit = async (userId, data) => {
  const {
    isPercentage,
    bankAccountId,
    amount,
    providerFees,
    providerPercentage,
  } = data;

  const bankAccount = await transactionServicesUtils.findBankAccount(
    bankAccountId
  );

  const { amountTotal, totalProviderDeduction, profit, providerRevenue } =
    calcDeposite(isPercentage, amount, providerFees, providerPercentage);

  const status = transactionServicesUtils.profitStatus(profit);

  const { balanceBefore, balanceAfter } =
    await transactionServicesUtils.updateBankAccount(bankAccount, amountTotal);

  await createDoc(Transaction, {
    ...data,
    type: 'ايداع',
    amount: Number(amount).toFixed(2),
    providerFees,
    amountTotal,
    providerRevenue,
    providerPercentage: isPercentage && providerPercentage,
    providerDeduction: totalProviderDeduction,
    profit,
    balanceBefore,
    balanceAfter,
    status,
    createdBy: userId,
    bankAccountId,
  });

  return { message: constants.CREATE_TRANSACTION_SUCCESS };
};

exports.updateDeposite = async (transactionId, data) => {
  const {
    isPercentage,
    bankAccountId,
    amount,
    providerFees,
    providerPercentage,
  } = data;

  console.log('data-----------', data);
  
  const transaction = await getDoc(Transaction, transactionId);
  console.log('transaction-------------------', transaction);
  const bankAccount = await getDoc(BankAccount, bankAccountId);
  console.log('bankAccount------------------', bankAccount);

  const { amountTotal, totalProviderDeduction, profit, providerRevenue } =
    calcDeposite(isPercentage, amount, providerFees, providerPercentage);
  const status = transactionServicesUtils.profitStatus(profit);

  // let { balanceAfter, bankBalance } =
  //   await transactionServicesUtils.updateTransactionInfo(
  //     transaction,
  //     amount,
  //     profit,
  //     (isTotalRevenue = true),
  //     totalProviderDeduction,
  //     bankAccount
  //   );

  let more = transaction.amountTotal - +amount;
  let balanceAfter = +transaction.balanceAfter - more;
  bankBalance = +bankAccount.balance - more;

  await bankAccount.update({ balance: bankBalance });

  await updateDoc(Transaction, transactionId, {
    ...data,
    amount: Number(amount).toFixed(2),
    providerFees,
    amountTotal,
    providerRevenue,
    providerPercentage: isPercentage && providerPercentage,
    providerDeduction: totalProviderDeduction,
    profit,
    balanceAfter,
    status,
  });

  return { message: constants.UPDATE_TRANSACTION_SUCCESS };
};

exports.deleteDeposite = async (transactionId) => {
  const transaction = await getDoc(Transaction, transactionId);

  const bankAccount = await getDoc(BankAccount, transaction.bankAccountId);

  const balance = bankAccount.balance - transaction.amountTotal;

  await updateDoc(BankAccount, transaction.bankAccountId, { balance });
  await updateDoc(Transaction, transactionId, { isDeleted: true });

  return { message: constants.DELETE_TRANSACTION_SUCCESS };
};
