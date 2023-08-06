const providerCommissionRepository = require('../../dataAccess/provider/providerCommissionRepository');
const providerRepository = require('../../dataAccess/provider/providerRepository');
const BadRequestError = require('../../utils/badRequestError');
const { checkResourceExists } = require('../../utils/checkResourceExists');
const constants = require('../../utils/constants');

const isProviderExist = async (id) => {
  const provider = await providerRepository.findById(id);
  return checkResourceExists(provider, constants.PROVIDER_NOT_FOUND);
};

exports.createProvider = async (userId, data) => {
  const { name, note } = data;

  await providerRepository.createOne({
    name,
    note,
    createdBy: userId,
  });

  return { message: constants.CREATE_PROVIDER_SUCCESS };
};

exports.updateProvider = async (providerId, data) => {
  const { name, note } = data;

  await isProviderExist(providerId);

  await providerRepository.updateOne(providerId, {
    name,
    note,
  });

  return { message: constants.UPDATE_PROVIDER_SUCCESS };
};

exports.deleteProvider = async (providerId) => {
  await isProviderExist(providerId);

  const providerCommissions = await providerCommissionRepository.findOne();
  if (providerCommissions) {
    throw new BadRequestError(constants.DELETE_PROVIDER_FAILD);
  }
  await providerRepository.deleteOne(providerId);

  return { message: constants.DELETE_PROVIDER_SUCCESS };
};

exports.findAllProvider = async (query) => {
  const { page, limit, order, sort } = query;

  const provider = await providerRepository.findAll(
    undefined,
    page,
    limit,
    order,
    sort
  );
  return { provider };
};
