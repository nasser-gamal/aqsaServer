const duesRepository = require('../../dataAccess/dues/dues.repository');
const { checkResourceExists } = require('../../utils/checkResourceExists');
const constants = require('../../utils/constants');

const isDuesExist = async (id) => {
  const dues = await duesRepository.findById(id);
  return checkResourceExists(dues, constants.DUES_NOT_FOUND);
};

exports.createDues = async (userId, data) => {
  const { amount, date, note } = data;

  await duesRepository.createOne({
    amount,
    date,
    note,
    createdBy: userId,
  });

  return { message: constants.CREATE_TREASURY_SUCCESS };
};

exports.updateDues = async (dueId, data) => {
  const { amount, date, note } = data;

  await isDuesExist(dueId);

  await duesRepository.updateOne(dueId, {
    amount,
    date,
    note,
  });

  return { message: constants.UPDATE_TREASURY_SUCCESS };
};

exports.deleteDues = async (treasuryId) => {
  await isDuesExist(treasuryId);

  await duesRepository.deleteOne(treasuryId);

  return { message: constants.DELETE_TREASURY_SUCCESS };
};

exports.findAllDues = async (query) => {
  const { page, limit, order, sort } = query;

  const dues = await duesRepository.findAll(
    undefined,
    page,
    limit,
    order,
    sort
  );
  return dues;
};
