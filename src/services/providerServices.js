const asyncHandler = require('express-async-handler');
const providerRepository = require('../dataAccess/provider/providerRepository');
const constants = require('../utils/constants');
const {
  createDoc,
  getDocs,
  updateDoc,
  getDoc,
  deleteDoc,
} = require('./factory.js');
const Provider = require('../models/providerModel.js');

exports.createProvider = asyncHandler(async (data) => {
  await createDoc(Provider, data);
  return { message: constants.CREATE_SUCCESS };
});

exports.getProviders = asyncHandler(async (query, filterObj) =>
  getDocs(Provider, query, filterObj)
);

exports.getProvider = asyncHandler(async (providerId) =>
  getDoc(Provider, providerId)
);

exports.updateProvider = asyncHandler(async (providerId, data) => {
  await updateDoc(Provider, providerId, data);
  return { message: constants.UPDATE_PROVIDER_SUCCESS };
});

exports.deleteProvider = asyncHandler(async (providerId) => {
  await updateDoc(Provider, providerId, {
    isDeleted: true,
  });
  return { message: constants.DELETE_PROVIDER_SUCCESS };
});
