const ProviderCommission = require('../models/providerCommission');
const constants = require('../utils/constants');
const asyncHandler = require('express-async-handler');
const {
  createDoc,
  getDocs,
  updateDoc,
  getDoc,
  deleteDoc,
} = require('./factory.js');
const User = require('../models/userModel.js');
const Provider = require('../models/providerModel.js');

exports.createProviderCommission = asyncHandler(async (data) => {
  await createDoc(ProviderCommission, data);
  return { message: constants.CREATE_PROVIDER_COMMISSION_SUCCESS };
});

exports.getProviderComissions = asyncHandler(async (query, filterObj) =>
  getDocs(ProviderCommission, query, filterObj, [
    {
      model: User,
      as: 'creator',
      attributes: ['id', 'userName', 'accountName'],
    },
    {
      model: Provider,
      as: 'provider',
    },
  ])
);

exports.getProviderComission = asyncHandler(async (providerCommissionId) =>
  getDoc(ProviderCommission, providerCommissionId)
);

exports.updateProviderCommission = asyncHandler(
  async (providerCommissionId, data) => {
    await updateDoc(ProviderCommission, providerCommissionId, data);
    return { message: constants.UPDATE_PROVIDER_COMMISSION_SUCCESS };
  }
);

exports.deleteProviderCommission = asyncHandler(
  async (providerCommissionId) => {
  await updateDoc(ProviderCommission, providerCommissionId, {
    isDeleted: true,
  });

    return { message: constants.DELETE_PROVIDER_COMMISSION_SUCCESS };
  }
);
