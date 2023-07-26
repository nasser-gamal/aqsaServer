const { Op } = require('sequelize');
const transactionRepository = require('../../dataAccess/transaction/transactionRepository');

exports.dailyProfits = async (query) => {
  const { startDate, endDate } = query;

  const nextDay = new Date(endDate);
  nextDay.setDate(nextDay.getDate() + 1);

  const whereClause = {
    createdAt: {
      [Op.between]: [startDate, nextDay.toISOString().slice(0, 10)],
    },
  };

  const { transactions } = await transactionRepository.findAll(whereClause);

  const depoite = transactions.filter((transaction) => {
    return transaction.type === 'ايداع';
  });

  const totalDepoite = depoite
    .reduce((acc, transaction) => {
      return acc + transaction.amountTotal;
    }, 0)
    .toFixed(2);

  const withdraw = transactions.filter((transaction) => {
    return transaction.type === 'سحب';
  });

  const totalWithdraw = withdraw
    .reduce((acc, transaction) => {
      return acc + transaction.amountTotal;
    }, 0)
    .toFixed(2);

  const totalProfits = transactions
    .reduce((acc, transaction) => {
      return acc + transaction.profit;
    }, 0)
    .toFixed(2);

  return {
    totalDepoite,
    totalWithdraw,
    totalDepoiteCount: depoite.length,
    totalWithdrawCount: withdraw.length,
    totalProfits,
  };
};
