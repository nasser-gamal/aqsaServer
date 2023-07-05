import * as bankAccountRepository from '../../dataAccess/banks/bankAccountRepository.js';
import * as bankRepository from '../../dataAccess/banks/bankRepository.js';

import BadRequestError from '../../utils/badRequestError.js';
import constants from '../../utils/constants.js';
import { checkResourceExists } from '../../utils/checkResourceExists.js';
import { Op } from 'sequelize';

const isBankExist = async (bankId) => {
  const bank = await bankRepository.findById(bankId);
  return checkResourceExists(bank, constants.BANK_NOT_FOUND);
};

const isBankAccountExist = async (bankAccountId) => {
  const bankAccount = await bankAccountRepository.findById(bankAccountId);
  return checkResourceExists(bankAccount, constants.BANK_ACCOUNT_NOT_FOUND);
};

export const createBankAccount = async (data) => {
  const { accountName, bankId, bankNumber, balance, note } = data;

  await isBankExist(bankId);

  const existBankAccount = await bankAccountRepository.findOne({
    bankNumber,
    bankId,
  });

  if (existBankAccount) {
    throw new BadRequestError(constants.BANK_ACCOUNT_EXIST);
  }

  await bankAccountRepository.createOne({
    accountName,
    bankNumber,
    balance,
    note,
    bankId,
  });

  return { message: constants.CREATE_BANK_ACCOUNT_SUCCESS };
};

export const updateBankAccount = async (bankAccountId, data) => {
  const { accountName, bankNumber, balance, note, bankId } = data;

  await isBankExist(bankId);
  await isBankAccountExist(bankAccountId);

  const query = {
    [Op.and]: { id: { [Op.ne]: bankAccountId }, bankNumber, bankId },
  };

  const existData = await bankAccountRepository.findOne(query);

  if (existData) {
    throw new BadRequestError(constants.BANK_ACCOUNT_EXIST);
  }

  await bankAccountRepository.updateOne(bankAccountId, {
    accountName,
    bankNumber,
    balance,
    note,
    bankId,
  });

  return { message: constants.UPDATE_BANK_ACCOUNT_SUCCESS };
};

export const deleteBankAccount = async (bankAccountId) => {
  await isBankAccountExist(bankAccountId);

  await bankAccountRepository.deleteOne(bankAccountId);

  return { message: constants.DELETE_BANK_ACCOUNT_SUCCESS };
};

export const getAllBankAccounts = async () => {
  const banks = await bankAccountRepository.findAll();
  return { banks };
};

export const getBankAccount = async (bankAccountId) => {
  const bank = await isBankAccountExist(bankAccountId);
  return { bank };
};
