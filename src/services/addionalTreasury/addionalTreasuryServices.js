const addionalTreasuryRepository = require('../../dataAccess/addionalTreasury/addionalTreasuryRepository');
const { checkResourceExists } = require('../../utils/checkResourceExists');
const constants = require('../../utils/constants');

const isAddionalTreasuryExist = async (id) => {
  const addionalTreasuryExist = await addionalTreasuryRepository.findById(id);
  return checkResourceExists(
    addionalTreasuryExist,
    constants.TRSEARY_NOT_FOUND
  );
};

exports.createAddionalTreasury = async (userId, data) => {
  const { amount, date, note } = data;

  await addionalTreasuryRepository.createOne({
    amount,
    date,
    note,
    createdBy: userId,
  });

  return { message: constants.CREATE_TREASURY_SUCCESS };
};

exports.updateAddionalTreasury = async (treasuryId, data) => {
  const { amount, date, note } = data;

  await isAddionalTreasuryExist(treasuryId);

  await addionalTreasuryRepository.updateOne(treasuryId, {
    amount,
    date,
    note,
  });

  return { message: constants.UPDATE_TREASURY_SUCCESS };
};

exports.deleteAddionalTreasury = async (treasuryId) => {
  await isAddionalTreasuryExist(treasuryId);

  await addionalTreasuryRepository.deleteOne(treasuryId);

  return { message: constants.DELETE_TREASURY_SUCCESS };
};

exports.findAllAddionalTreasury = async () => {
  const addionalTreasurys = await addionalTreasuryRepository.findAll();
  return addionalTreasurys;
};
