const { Op } = require('sequelize');
const transactionRepository = require('../../dataAccess/transaction/transactionRepository');

exports.dailyReports = async (query) => {
  const { date, bankNumber } = query;

  const whereClause = {
    createdAt: { [Op.eq]: date },
  };

  const transactions = await transactionRepository.findAll(whereClause, {
    bankNumber,
  });

  return transactions;
};
