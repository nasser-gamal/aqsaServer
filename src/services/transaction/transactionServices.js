const transactionRepository = require('../../dataAccess/transaction/transactionRepository.js');

exports.findAllTransactions = async (
  page,
  limit,
  order,
  sort,
  whereClause
) => {
  const { transactions, pagination } = await transactionRepository.findAll(
    page,
    limit,
    order,
    sort,
    whereClause
  );
  return { transactions, pagination };
};
