import * as bankAccountRepository from '../dataAccess/banks/bankAccountRepository.js';
import * as transactionRepository from '../dataAccess/transaction/transactionRepository.js';
import * as treasuryRepository from '../dataAccess/treasury/treasuryRepository.js';

import { checkResourceExists } from './checkResourceExists.js';
import constants from './constants.js';

export const isTransactionExists = async (query) => {
  const transaction = await transactionRepository.findOne(query);
  return checkResourceExists(transaction, constants.TRANSACTIONS_NOT_FOUND);
};

export const findBankAccount = async (bankAccountId) => {
  const bankAccount = await bankAccountRepository.findById(bankAccountId);
  return checkResourceExists(bankAccount, constants.BANK_ACCOUNT_NOT_FOUND);
};

export const updateBankAccount = async (bankAccount, amountTotal) => {
  let balanceBefore = Number(bankAccount.balance);
  const balanceAfter = balanceBefore + Number(amountTotal);

  await bankAccount.update({
    balance: balanceAfter,
  });
  return {
    balanceBefore,
    balanceAfter,
  };
};

export const findTreasury = async () => {
  const treasury = treasuryRepository.findOne();
  return checkResourceExists(treasury, constants.TREASURY_NOT_FOUND);
};

export const updateTreasury = async (treasury, amountTotal) => {
  await treasury.update({
    amountTotal,
  });
};

export const profitStatus = (profit) => {
  let status;
  if (profit === 0) {
    status = 'لا يوجد';
  } else if (profit > 0) {
    status = 'مكسب';
  } else {
    status = 'خسارة';
  }
  return status;
};


export const updateTransactionInfo = async (
  transaction,
  amount,
  profit,
  treasury
) => {
  let more = +amount - transaction.amountTotal;
  let balanceAfter = +transaction.balanceAfter + more;
  let newProfit = +profit - +transaction.profit;
  let treasuryAmount = +treasury.amountTotal + +newProfit;

  return { balanceAfter, treasuryAmount };
};
