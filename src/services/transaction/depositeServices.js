const transactionRepository = require('../../dataAccess/transaction/transactionRepository.js');

const transactionServicesUtils = require('../../utils/transactionServicesUtils.js');
const treasuryRepository = require('../../dataAccess/treasury/treasuryRepository.js');

const constants = require('../../utils/constants.js');

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
    date,
    number,
    amount,
    providerFees,
    providerPercentage,
    note,
  } = data;

  const bankAccount = await transactionServicesUtils.findBankAccount(
    bankAccountId
  );
  const treasury = await transactionServicesUtils.findTreasury();

  const { amountTotal, totalProviderDeduction, profit, providerRevenue } =
    calcDeposite(isPercentage, amount, providerFees, providerPercentage);

  const status = transactionServicesUtils.profitStatus(profit);

  const { balanceBefore, balanceAfter } =
    await transactionServicesUtils.updateBankAccount(bankAccount, amountTotal);
  await transactionServicesUtils.updateTreasury(
    treasury,
    +treasury.amountTotal + +profit
  );

  await transactionRepository.createOne({
    isPercentage,
    type: 'ايداع',
    amount: Number(amount).toFixed(2),
    number,
    date,
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
    note,
  });

  return { message: constants.CREATE_TRANSACTION_SUCCESS };
};

exports.updateDeposite = async (transactionId, data) => {
  const {
    isPercentage,
    bankAccountId,
    date,
    number,
    amount,
    providerFees,
    providerPercentage,
    note,
  } = data;

  // check if the Transaction is exists
  const transaction = await transactionServicesUtils.isTransactionExists({
    id: transactionId,
  });

  const bankAccount = await transactionServicesUtils.findBankAccount(
    bankAccountId
  );

  const { amountTotal, totalProviderDeduction, profit, providerRevenue } =
    calcDeposite(isPercentage, amount, providerFees, providerPercentage);
  const status = transactionServicesUtils.profitStatus(profit);

  let { balanceAfter, bankBalance } =
    await transactionServicesUtils.updateTransactionInfo(
      transaction,
      amount,
      profit,
      isTotalRevenue = true,
      totalProviderDeduction,
      bankAccount
    );


  await bankAccount.update({ balance: bankBalance });

  await transactionRepository.updateOne(transactionId, {
    isPercentage,
    amount: Number(amount).toFixed(2),
    number,
    providerFees,
    amountTotal,
    providerRevenue,
    providerPercentage: isPercentage && providerPercentage,
    providerDeduction: totalProviderDeduction,
    profit,
    balanceAfter,
    status,
    date,
    note,
  });

  return { message: constants.UPDATE_TRANSACTION_SUCCESS };
};

exports.deleteDeposite = async (transactionId) => {
  const transaction = await transactionServicesUtils.isTransactionExists({
    id: transactionId,
  });
  const bankAccount = await transactionServicesUtils.findBankAccount(
    transaction.bankAccountId
  );

  const balance = bankAccount.balance - transaction.amountTotal;

  // update the bank account balance
  await bankAccount.update({ balance });

  const treasury = await transactionServicesUtils.findTreasury();

  // update the treasury  amountToal
  const treasuryAmount = treasury.amountTotal - transaction.profit;
  await transactionServicesUtils.updateTreasury(treasury, treasuryAmount);

  await transaction.destroy();

  return { message: constants.DELETE_TRANSACTION_SUCCESS };
};
