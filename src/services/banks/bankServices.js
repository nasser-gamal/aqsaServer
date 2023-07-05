import * as bankRepository from '../../dataAccess/banks/bankRepository.js';

import BadRequestError from '../../utils/badRequestError.js';
import constants from '../../utils/constants.js';
import { checkResourceExists } from '../../utils/checkResourceExists.js';

import { Op } from 'sequelize';

const isBankExist = async (bankId) => {
  const bank = await bankRepository.findById(bankId);
  return checkResourceExists(bank, constants.BANK_NOT_FOUND);
};

export const createBank = async (data) => {
  const { bankName, note } = data;

  const existBank = await bankRepository.findOne({ bankName });

  if (existBank) {
    throw new BadRequestError(constants.BANK_EXIST);
  }

  await bankRepository.createOne({
    bankName,
    note,
  });

  return { message: constants.CREATE_BANK_SUCCESS };
};

export const updateBank = async (bankId, data) => {
  const { bankName, note } = data;

  await isBankExist(bankId);

  const query = {
    [Op.and]: { id: { [Op.ne]: bankId }, bankName },
  };

  const existData = await bankRepository.findOne(query);

  if (existData) {
    throw new BadRequestError(constants.BANK_EXIST);
  }

  await bankRepository.updateOne(bankId, {
    bankName,
    note,
  });

  return { message: constants.UPDATE_BANK_SUCCESS };
};

export const deleteBank = async (bankId) => {
  const bank = await isBankExist(bankId);

  await bankRepository.deleteOne(bankId);

  return { message: constants.DELETE_BANK_SUCCESS };
};

export const getAllBanks = async () => {
  const banks = await bankRepository.findAll();
  return { banks };
};

export const getBank = async (bankId) => {
  const bank = await isBankExist(bankId);
  return { bank };
};
