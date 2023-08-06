const providerCommissionRepository = require('../../dataAccess/provider/providerCommissionRepository');
const { checkResourceExists } = require('../../utils/checkResourceExists');
const constants = require('../../utils/constants');

const isProviderCommissionExist = async (id) => {
  const providerCommission = await providerCommissionRepository.findById(id);
  return checkResourceExists(
    providerCommission,
    constants.PROVIDER_COMMISSION_NOT_FOUND
  );
};

exports.createProviderCommission = async (userId, data) => {
  const { providerId, commission, date, note } = data;

  await providerCommissionRepository.createOne({
    providerId,
    commission,
    date,
    note,
    createdBy: userId,
  });

  return { message: constants.CREATE_PROVIDER_COMMISSION_SUCCESS };
};

exports.updateProviderCommission = async (providerCommissionId, data) => {
  const { providerId, commission, date, note } = data;

  await isProviderCommissionExist(providerCommissionId);

  await providerCommissionRepository.updateOne(providerCommissionId, {
    providerId,
    commission,
    date,
    note,
  });

  return { message: constants.UPDATE_PROVIDER_COMMISSION_SUCCESS };
};

exports.deleteProviderCommission = async (providerCommissionId) => {
  await isProviderCommissionExist(providerCommissionId);

  await providerCommissionRepository.deleteOne(providerCommissionId);

  return { message: constants.DELETE_PROVIDER_COMMISSION_SUCCESS };
};

exports.findAllProviderCommissions = async (query) => {
  const { page, limit, order, sort } = query;

  const providerCommissions = await providerCommissionRepository.findAll(
    undefined,
    page,
    limit,
    order,
    sort
  );
  return { providerCommissions };
};
