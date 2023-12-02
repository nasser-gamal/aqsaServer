const { Op } = require('sequelize');
const constants = require('../../utils/constants.js');
const transactionServicesUtils = require('../../utils/transactionServicesUtils.js');
const { getDocs } = require('../factory.js');
const Transaction = require('../../models/transaction/transactionModel.js');
const User = require('../../models/userModel');
const BankAccount = require('../../models/bankAccountModel');
const Bank = require('../../models/bankModel.js');
const asyncHandler = require('express-async-handler');
const { sequelize } = require('../../config/database.js');
const ApiFeature = require('../../utils/ApiFeature.js');

const calcTotalTransactions = (docs) => {
  const deposite = docs.filter((transaction) => {
    return transaction.type === 'ايداع';
  });

  const totalDeposite = deposite
    .reduce((acc, transaction) => {
      return acc + transaction.amountTotal;
    }, 0)
    .toFixed(2);

  const withdraw = docs.filter((transaction) => {
    return transaction.type === 'سحب';
  });
  const totalWithdraw = withdraw
    .reduce((total, transaction) => {
      return (transaction.balanceBefore - transaction.balanceAfter).toFixed(
        2
      ) == transaction.amountTotal.toFixed(2)
        ? total + transaction.amountTotal
        : total + transaction.providerDeduction;
    }, 0)
    .toFixed(2);

  return { totalDeposite, totalWithdraw };
};

exports.getAllTransactions = asyncHandler(async (queryObj, filterObj) => {
  const { docs, pagination } = await getDocs(Transaction, queryObj, filterObj, [
    {
      model: User,
      as: 'creator',
      // where: userClause,
      attributes: ['userName', 'accountName'],
    },
    {
      model: BankAccount,
      // where: accountsClause,
      attributes: ['accountName', 'bankNumber', 'balance'],
      include: [{ model: Bank, attributes: ['id', 'bankName'] }],
    },
  ]);

  const { totalDeposite, totalWithdraw } = calcTotalTransactions(docs);

  const profit = docs
    .reduce((acc, transaction) => {
      return acc + transaction.profit;
    }, 0)
    .toFixed(2);

  return { docs, pagination, totalDeposite, totalWithdraw, profit };
});

exports.aggregation = asyncHandler(async (queryObj, filterObj) => {
  const numOfDocs = (await Transaction.findAndCountAll()).count;
  const { conditions, sortArr, pagination } = new ApiFeature(queryObj)
    .filter()
    .sort()
    .paginate(numOfDocs);

  const docs = await Transaction.findAll({
    where: {
      ...conditions,
      ...filterObj,
      isDeleted: false,
    },
    // offset: pagination.offset,
    // limit: 2,
    raw: true,
    // order: sortArr,
    attributes: [
      [sequelize.fn('COUNT', sequelize.col('id')), 'transactionCount'],
      [sequelize.fn('SUM', sequelize.col('amount')), 'transactionAmount'],
      [
        sequelize.literal(
          `SUM(CASE WHEN type = 'ايداع' THEN amount ELSE 0 END)`
        ),
        'depositTotal',
      ],
      [
        sequelize.literal(`SUM(CASE WHEN type = 'ايداع' THEN 1 ELSE 0 END)`),
        'depositCount',
      ],
      [
        sequelize.literal(`SUM(CASE WHEN type = 'سحب' THEN amount ELSE 0 END)`),
        'withdrawalTotal',
      ],
      [
        sequelize.literal(`SUM(CASE WHEN type = 'سحب' THEN 1 ELSE 0 END)`),
        'withdrawalCount',
      ],
      [sequelize.fn('SUM', sequelize.col('profit')), 'profit'],
    ],
  });

  return { docs: docs[0] };
});

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
