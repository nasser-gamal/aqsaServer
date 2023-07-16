const transactionRepository = require('../../dataAccess/transaction/transactionRepository.js');
const transactionServicesUtils = require('../../utils/transactionServicesUtils.js');

const constants = require('../../utils/constants.js');
const BadRequestError = require('../../utils/badRequestError.js');

// const checkBankAccountBalance = async (bankAccount, amountTotal) => {
//   if (+bankAccount.balance < +amountTotal) {
//     throw new BadRequestError(constants.BANK_ACCOUNT_BALANCE_NOT_ENOUGH, 400);
//   }
// };

const calcWithDraw = (
  isPercentage,
  amount,
  providerFees,
  providerPercentage,
  agentDeduction,
  agentRevenue
) => {
  // المخصوم م البنك
  let amountTotal = (+amount + +providerFees).toFixed(2);

  let providerRevenue = isPercentage
    ? (providerPercentage / 100) * amountTotal
    : providerPercentage;
  // المخصوم م المزود
  let totalProviderDeduction = (amountTotal - +providerRevenue).toFixed(2);

  // المخصوم م المركز
  let totalAgentDeduction = (+agentDeduction - +agentRevenue).toFixed(2);

  // الربح
  let profit = (totalAgentDeduction - totalProviderDeduction).toFixed(2);

  return {
    amountTotal,
    totalProviderDeduction,
    totalAgentDeduction,
    profit,
    providerRevenue,
  };
};

exports.addWithDraw = async (userId, data) => {
  const {
    isPercentage,
    date,
    bankAccountId,
    number,
    amount,
    agentDeduction,
    agentRevenue,
    providerPercentage,
    providerFees,
    note,
  } = data;

  const bankAccount = await transactionServicesUtils.findBankAccount(
    bankAccountId
  );
  const treasury = await transactionServicesUtils.findTreasury();

  const {
    amountTotal,
    totalProviderDeduction,
    totalAgentDeduction,
    profit,
    providerRevenue,
  } = calcWithDraw(
    isPercentage,
    amount,
    providerFees,
    providerPercentage,
    agentDeduction,
    agentRevenue
  );
  const status = transactionServicesUtils.profitStatus(profit);
  // await checkBankAccountBalance(bankAccount, amountTotal);

  const { balanceBefore, balanceAfter } =
    await transactionServicesUtils.updateBankAccount(
      bankAccount,
      -totalProviderDeduction
    );
    await transactionServicesUtils.updateTreasury(
      treasury,
      +treasury.amountTotal + +profit
    );

  await transactionRepository.createOne({
    type: 'سحب',
    date,
    isPercentage,
    amount: Number(amount).toFixed(2),
    number,
    providerFees,
    providerPercentage: isPercentage && providerPercentage,
    providerRevenue,
    providerDeduction: totalProviderDeduction,
    amountTotal,
    agentDeduction,
    agentRevenue,
    agentTotalDeduction: totalAgentDeduction,
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

exports.updateWithDraw = async (transactionId, data) => {
  const {
    isPercentage,
    bankAccountId,
    number,
    amount,
    agentDeduction,
    agentRevenue,
    providerPercentage,
    providerFees,
    note,
  } = data;

  // check if the Transaction is exists
  const transaction = await transactionServicesUtils.isTransactionExists({
    id: transactionId,
  });

  const bankAccount = await transactionServicesUtils.findBankAccount(
    bankAccountId
  );

  const {
    amountTotal,
    totalProviderDeduction,
    totalAgentDeduction,
    profit,
    providerRevenue,
  } = calcWithDraw(
    isPercentage,
    amount,
    providerFees,
    providerPercentage,
    agentDeduction,
    agentRevenue
  );

  const status = transactionServicesUtils.profitStatus(profit);

  const treasury = await transactionServicesUtils.findTreasury();

  let { balanceAfter, treasuryAmount } =
    await transactionServicesUtils.updateTransactionInfo(
      transaction,
      amountTotal,
      profit,
      treasury
    );

  treasury,
    await transactionServicesUtils.updateTreasury(treasury, treasuryAmount);
  await bankAccount.update({ balance: balanceAfter });

  await transaction.update({
    amount: Number(amount).toFixed(2),
    number,
    providerFees,
    providerPercentage,
    providerRevenue,
    providerDeduction: totalProviderDeduction,
    amountTotal,
    agentDeduction,
    agentRevenue,
    agentTotalDeduction: totalAgentDeduction,
    profit,
    balanceAfter,
    status,
    bankAccountId,
    note,
  });

  return { message: constants.UPDATE_TRANSACTION_SUCCESS };
};

exports.deleteWithDraw = async (transactionId) => {
  const transaction = await transactionServicesUtils.isTransactionExists({
    id: transactionId,
  });
  const bankAccount = await transactionServicesUtils.findBankAccount(
    transaction.bankAccountId
  );

  const balance = bankAccount.balance + transaction.amountTotal;

  // update the bank account balance
  await bankAccount.update({ balance });

  const treasury = await transactionServicesUtils.findTreasury();

  // update the treasury  amountToal
  const treasuryAmount = treasury.amountTotal - transaction.profit;
  await transactionServicesUtils.updateTreasury(treasury, treasuryAmount);

  await transaction.destroy();

  return { message: constants.DELETE_TRANSACTION_SUCCESS };
};
