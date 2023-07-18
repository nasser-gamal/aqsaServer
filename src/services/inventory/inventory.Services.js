const { Op } = require('sequelize');
const transactionRepository = require('../../dataAccess/transaction/transactionRepository');
const { checkResourceExists } = require('../../utils/checkResourceExists');
const BadRequestError = require('../../utils/badRequestError');
const constants = require('../../utils/constants');
const userCommissionRepository = require('../../dataAccess/commission/userCommission.repository.js');

exports.getProfits = async (query) => {
  const { startDate, endDate } = query;

  const nextDay = new Date(endDate);
  nextDay.setDate(nextDay.getDate() + 1);

  const whereClause = {
    createdAt: {
      [Op.between]: [startDate, nextDay.toISOString().slice(0, 10)],
    },
  };

  const { transactions } = await transactionRepository.findAll(whereClause);

  const totalProfits = transactions.reduce((acc, transaction) => {
    return acc + transaction.profit;
  }, 0);

  const month = new Date(startDate).getMonth();
  const agentQuery = {
    month,
  };
  const agentCommissions = await userCommissionRepository.findAll(agentQuery);

  return { totalProfits, agentCommissions };
};
