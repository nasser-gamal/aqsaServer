const { Op } = require('sequelize');
const agentTreasuryRepository = require('../../dataAccess/agentTreasury/agentTreasuryRepository');
const providerTreasuryRepository = require('../../dataAccess/providerTreasury/providerTreasuryRepository');
const addionalTreasuryRepository = require('../../dataAccess/addionalTreasury/addionalTreasuryRepository');
const bankAccountRepository = require('../../dataAccess/banks/bankAccountRepository');
const transactionRepository = require('../../dataAccess/transaction/transactionRepository');
const providerCommissionRepository = require('../../dataAccess/provider/providerCommissionRepository');
const feesRepository = require('../../dataAccess/fees/feesRepository');
const UserCommission = require('../../dataAccess/commission/userCommission.repository');
const { checkResourceExists } = require('../../utils/checkResourceExists');
const BadRequestError = require('../../utils/badRequestError');
const constants = require('../../utils/constants');

exports.getInventroy = async (query) => {
  const { startDate, endDate } = query;

  const nextDay = new Date(endDate);
  nextDay.setDate(nextDay.getDate() + 1);

  const dateClause = {
    date: {
      [Op.between]: [startDate, nextDay.toISOString().slice(0, 10)],
    },
  };

  const createdAtClause = {
    createdAt: {
      [Op.between]: [startDate, nextDay.toISOString().slice(0, 10)],
    },
  };

  const { agentTreasury } = await agentTreasuryRepository.findAll(dateClause);

  const totalAgentTreasury = agentTreasury
    .reduce((acc, agentTreasury) => {
      return acc + agentTreasury.amount;
    }, 0)
    .toFixed(2);

  const { providerTreasury } = await providerTreasuryRepository.findAll(
    dateClause
  );

  const totalProviderTreasury = providerTreasury
    .reduce((acc, providerTreasury) => {
      return acc + providerTreasury.amount;
    }, 0)
    .toFixed(2);

  const { addionalTreasury } = await addionalTreasuryRepository.findAll(
    dateClause
  );

  const totalAddionalTreasury = addionalTreasury
    .reduce((acc, addionalTreasury) => {
      return acc + addionalTreasury.amount;
    }, 0)
    .toFixed(2);

  const { bankAccounts } = await bankAccountRepository.findAll(createdAtClause);

  const totalBankAmount = bankAccounts
    .reduce((acc, bankAccount) => {
      return acc + bankAccount.balance;
    }, 0)
    .toFixed(2);

  const { transactions } = await transactionRepository.findAll(dateClause);

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

  const { providerCommissions } = await providerCommissionRepository.findAll(
    dateClause
  );

  const totalProviderCommission = providerCommissions
    .reduce((acc, providerCommisison) => {
      return acc + +providerCommisison.commission;
    }, 0)
    .toFixed(2);

  const { fees } = await feesRepository.findAll(dateClause);

  const totalFees = fees
    .reduce((acc, fee) => {
      return acc + fee.amount;
    }, 0)
    .toFixed(2);

  const totalProfits = (
    +profits +
    +totalProviderCommission -
    (+totalCommission + +totalFees)
  ).toFixed(2);

  const totalCurrentBalance =
    +totalAgentTreasury -
    (
      +totalProviderTreasury +
      +totalAddionalTreasury +
      +totalBankAmount +
      +totalProfits
    ).toFixed(2);

  return {
    totalAgentTreasury,
    totalProviderTreasury,
    totalAddionalTreasury,
    totalBankAmount,
    totalProfits,
    totalCurrentBalance,
  };
};
