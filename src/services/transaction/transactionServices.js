const transactionRepository = require('../../dataAccess/transaction/transactionRepository.js');

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
