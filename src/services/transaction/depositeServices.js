const transactionRepository = require('../../dataAccess/transaction/transactionRepository.js');

const transactionServicesUtils = require('../../utils/transactionServicesUtils.js');
const treasuryRepository = require('../../dataAccess/treasury/treasuryRepository.js');

const constants = require('../../utils/constants.js');

const calcDeposite = (amount, providerFees, providerRevenue) => {
  let amountTotal = Number(amount).toFixed(2);
  let profit = (+providerRevenue - +providerFees).toFixed(2);
  let totalProviderDeduction = (amountTotal - profit).toFixed(2);

  return {
    amountTotal,
    totalProviderDeduction,
    profit,
  };
};

exports.addDeposit = async (userId, data) => {
  const { bankAccountId, number, amount, providerFees, providerRevenue, note } =
    data;

  const bankAccount = await transactionServicesUtils.findBankAccount(
    bankAccountId
  );
  const treasury = await transactionServicesUtils.findTreasury();

  const { amountTotal, totalProviderDeduction, profit } = calcDeposite(
    amount,
    providerFees,
    providerRevenue
  );

  const status = transactionServicesUtils.profitStatus(profit);

  const { balanceBefore, balanceAfter } =
    await transactionServicesUtils.updateBankAccount(bankAccount, amountTotal);
  await transactionServicesUtils.updateTreasury(
    treasury,
    +treasury.amountTotal + +profit
  );

  await transactionRepository.createOne({
    type: 'ايداع',
    amount: Number(amount).toFixed(2),
    number,
    providerFees,
    amountTotal,
    providerRevenue,
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
    bankAccountId,
    type,
    number,
    amount,
    providerFees,
    providerRevenue,
    note,
  } = data;

  // check if the Transaction is exists
  const transaction = await transactionServicesUtils.isTransactionExists({
    id: transactionId,
  });

  const bankAccount = await transactionServicesUtils.findBankAccount(
    bankAccountId
  );

  const { amountTotal, totalProviderDeduction, profit } = calcDeposite(
    amount,
    providerFees,
    providerRevenue
  );

  const status = transactionServicesUtils.profitStatus(profit);

  const treasury = await transactionServicesUtils.findTreasury();

  let { balanceAfter, treasuryAmount } =
    await transactionServicesUtils.updateTransactionInfo(
      transaction,
      amount,
      profit,
      treasury
    );

  treasury,
    await transactionServicesUtils.updateTreasury(treasury, treasuryAmount);
  await bankAccount.update({ balance: balanceAfter });

  await transactionRepository.updateOne(transactionId, {
    amount: amount.toFixed(2),
    number,
    providerFees,
    amountTotal,
    providerRevenue,
    providerDeduction: totalProviderDeduction,
    profit,
    balanceAfter,
    status,
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
