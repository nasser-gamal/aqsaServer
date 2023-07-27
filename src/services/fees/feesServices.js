const feesRepository = require('../../dataAccess/fees/feesRepository');
const constants = require('../../utils/constants');

const isFeesExist = async (id) => {
  const fees = await feesRepository.findById(id);
  return checkResourceExists(fees, constants.FEES_NOT_FOUND);
};

exports.createFees = async (data) => {
  const { amount, note } = data;

  await feesRepository.createOne({
    amount,
    note,
    createdBy: userId,
  });

  return { message: constants.CREATE_FEES_SUCCESS };
};

exports.updateFees = async (feesId, data) => {
  const { amount, note } = data;

  await isFeesExist(feesId);

  await feesRepository.updateOne(feesId, {
    amount,
    note,
    createdBy: userId,
  });

  return { message: constants.UPDATE_FEES_SUCCESS };
};

exports.deleteFees = async (feesId) => {
  await isFeesExist(feesId);

  await feesRepository.deleteOne(feesId);

  return { message: constants.DELETE_FEES_SUCCESS };
};

exports.findAllFees = async () => {
  const fees = await feesRepository.findAll();
  return { fees };
};
