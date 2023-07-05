import * as transactionRepository from '../../dataAccess/transaction/transactionRepository.js';

export const findAllTransactions = async (
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
