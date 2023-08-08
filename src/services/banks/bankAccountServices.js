const bankAccountRepository = require('../../dataAccess/banks/bankAccountRepository.js');
const bankRepository = require('../../dataAccess/banks/bankRepository.js');
const transactionRepository = require('../../dataAccess/transaction/transactionRepository.js');

const BadRequestError = require('../../utils/badRequestError.js');
const constants = require('../../utils/constants.js');
const { checkResourceExists } = require('../../utils/checkResourceExists.js');
const { Op } = require('sequelize');

const isBankExist = async (bankId) => {
  const bank = await bankRepository.findById(bankId);
  return checkResourceExists(bank, constants.BANK_NOT_FOUND);
};

const isBankAccountExist = async (bankAccountId) => {
  const bankAccount = await bankAccountRepository.findById(bankAccountId);
  return checkResourceExists(bankAccount, constants.BANK_ACCOUNT_NOT_FOUND);
};

exports.createBankAccount = async (data) => {
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

exports.updateBankAccount = async (bankAccountId, data) => {
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

exports.deleteBankAccount = async (bankAccountId) => {
  await isBankAccountExist(bankAccountId);

  await await transactionRepository.deleteOne({ bankAccountId });

  await bankAccountRepository.deleteOne(bankAccountId);

  return { message: constants.DELETE_BANK_ACCOUNT_SUCCESS };
};

exports.getAllBankAccounts = async (query) => {
  const { page, limit, order, sort } = query;

  const { bankAccounts, pagination } = await bankAccountRepository.findAll(
    undefined,
    page,
    limit,
    order,
    sort
  );
  return { bankAccounts, pagination };
};

exports.getBankAccount = async (bankAccountId) => {
  const bank = await isBankAccountExist(bankAccountId);
  return { bank };
};
