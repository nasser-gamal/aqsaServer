const bankRepository = require('../../dataAccess/banks/bankRepository.js');

const BadRequestError = require('../../utils/badRequestError.js');
const constants = require('../../utils/constants.js');
const { checkResourceExists } = require('../../utils/checkResourceExists.js');

const { Op } = require('sequelize');


const isBankExist = async (bankId) => {
  const bank = await bankRepository.findById(bankId);
  return checkResourceExists(bank, constants.BANK_NOT_FOUND);
};

exports.createBank = async (data) => {
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

exports.updateBank = async (bankId, data) => {
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

exports.deleteBank = async (bankId) => {
  const bank = await isBankExist(bankId);

  await bankRepository.deleteOne(bankId);

  return { message: constants.DELETE_BANK_SUCCESS };
};

exports.getAllBanks = async () => {
  const banks = await bankRepository.findAll();
  return { banks };
};

exports.getBank = async (bankId) => {
  const bank = await isBankExist(bankId);
  return { bank };
};
