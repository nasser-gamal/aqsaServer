const { Op } = require('sequelize');
const transactionRepository = require('../../dataAccess/transaction/transactionRepository');
const UserCommission = require('../../dataAccess/commission/userCommission.repository');

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
      return (transaction.balanceBefore - transaction.balanceAfter).toFixed(
        2
      ) == transaction.amountTotal.toFixed(2)
        ? acc + transaction.amountTotal
        : acc + transaction.providerDeduction;
    }, 0)
    .toFixed(2);

  const profits = transactions
    .reduce((acc, transaction) => {
      return acc + transaction.profit;
    }, 0)
    .toFixed(2);

  const dateFrom = new Date(startDate);
  const dateTo = new Date(endDate);

  const monthFrom = dateFrom.getMonth() + 1;
  const monthTo = dateTo.getMonth() + 1;
  const yearFrom = dateFrom.getFullYear();
  const yearTo = dateTo.getFullYear();

  const { commissions } = await UserCommission.findAll({
    [Op.or]: [
      {
        year: yearFrom,
        [Op.and]: [
          { month: { [Op.gte]: monthFrom } },
          { month: { [Op.lte]: monthTo } },
        ],
      },
      {
        year: yearTo,
        [Op.and]: [
          { month: { [Op.gte]: monthFrom } },
          { month: { [Op.lte]: monthTo } },
        ],
      },
    ],
  });

  let totalCommission = 0;

  commissions.map((commission) => {
    commission.commissions.map((com) => {
      totalCommission += +com.commission;
    });
  });

  const totalProfits = profits - totalCommission;

  return {
    transactions: {
      totalDepoite,
      totalWithdraw,
      totalDepoiteCount: depoite.length,
      totalWithdrawCount: withdraw.length,
      profits,
      totalProfits,
    },
    commissions: {
      userCommissionCount: commissions.length,
      totalCommission,
    },
  };
};
