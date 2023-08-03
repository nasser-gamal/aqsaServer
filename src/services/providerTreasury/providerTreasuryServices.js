const providerTreasuryRepository = require('../../dataAccess/providerTreasury/providerTreasuryRepository');
const { checkResourceExists } = require('../../utils/checkResourceExists');
const constants = require('../../utils/constants');

const isProviderTreasuryExist = async (id) => {
  const providerTreasuryExist = await providerTreasuryRepository.findById(id);
  return checkResourceExists(
    providerTreasuryExist,
    constants.PROVIDER_TRSEARY_NOT_FOUND
  );
};

exports.createProviderTreasury = async (userId, data) => {
  const { amount, date, note } = data;

  await providerTreasuryRepository.createOne({
    amount,
    date,
    note,
    createdBy: userId,
  });

  return { message: constants.CREATE_TREASURY_SUCCESS };
};

exports.updateProviderTreasury = async (treasuryId, data) => {
  const { amount, date, note } = data;

  await isProviderTreasuryExist(treasuryId);

  await agentTreasury.updateOne(treasuryId, {
    amount,
    date,
    note,
  });

  return { message: constants.UPDATE_TREASURY_SUCCESS };
};

exports.deleteProviderTreasury = async (treasuryId) => {
  await isProviderTreasuryExist(treasuryId);

  await providerTreasuryRepository.deleteOne(treasuryId);

  return { message: constants.DELETE_TREASURY_SUCCESS };
};

exports.findAllProviderTreasury = async () => {
  const providerTreasurys = await providerTreasuryRepository.findAll();
  return providerTreasurys;
};
