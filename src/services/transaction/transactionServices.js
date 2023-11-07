const transactionRepository = require('../../dataAccess/transaction/transactionRepository.js');
const constants = require('../../utils/constants.js');
const transactionServicesUtils = require('../../utils/transactionServicesUtils.js');

exports.findAllTransactions = async (whereClause, page, limit, order, sort) => {
  const { transactions, pagination } = await transactionRepository.findAll(
    whereClause,
    undefined,
    page,
    limit,
    order,
    sort
  );
  return { transactions, pagination };
};

exports.deleteTransaction = async (transactionId, type) => {
  const transaction = await transactionServicesUtils.isTransactionExists({
    id: transactionId,
  });

  const bankAccount = await transactionServicesUtils.findBankAccount(
    transaction.bankAccountId
  );

  let balance;

  if (type === 'deposit') {
    balance = +bankAccount.balance - +transaction.amountTotal;
  } else {
    const amountTotal =
      (transaction.balanceBefore - transaction.balanceAfter).toFixed(2) ==
      transaction.amountTotal.toFixed(2)
        ? transaction.amountTotal
        : transaction.providerDeduction;
    balance = bankAccount.balance + amountTotal;

  }

  // update the bank account balance
  await bankAccount.update({ balance });

  transaction.isDeleted = true;
  await transaction.save();

  return { message: constants.DELETE_TRANSACTION_SUCCESS };
};

exports.restoreTransaction = async (transactionId, type) => {
  const transaction = await transactionServicesUtils.isTransactionExists({
    id: transactionId,
  });

  const bankAccount = await transactionServicesUtils.findBankAccount(
    transaction.bankAccountId
  );

  let balance;

  if (type === 'deposit') {

    balance = +bankAccount.balance + +transaction.amountTotal;
  } else {
    const amountTotal =
      (transaction.balanceBefore - transaction.balanceAfter).toFixed(2) ==
      transaction.amountTotal.toFixed(2)
        ? transaction.amountTotal
        : transaction.providerDeduction;
    balance = bankAccount.balance - amountTotal;
  }

  // update the bank account balance
  await bankAccount.update({ balance });
  
  transaction.isDeleted = false;
  await transaction.save();

  return { message: constants.RESTORE_TRANSACTION_SUCCESS };
};
