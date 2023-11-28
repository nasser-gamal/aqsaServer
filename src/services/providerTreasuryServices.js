const ProviderTreasury = require('../models/providerTreasuryModel.js');
const constants = require('../utils/constants');
const asyncHandler = require('express-async-handler');
const {
  createDoc,
  getDocs,
  updateDoc,
  getDoc,
  deleteDoc,
} = require('./factory.js');

exports.createProviderTreasury = asyncHandler(async (data) => {
  await createDoc(ProviderTreasury, data);
  return { message: constants.CREATE_SUCCESS };
});

exports.getProviderTreasuries = asyncHandler(async (query, filterObj) =>
  getDocs(ProviderTreasury, query, filterObj)
);

exports.getProviderTreasury = asyncHandler(async (treasuryId) =>
  getDoc(ProviderTreasury, treasuryId)
);

exports.updateProviderTreasury = asyncHandler(async (treasuryId, data) => {
  await updateDoc(ProviderTreasury, treasuryId, data);
  return { message: constants.UPDATE_SUCCESS };
});

exports.deleteProviderTreasury = asyncHandler(async (treasuryId) => {
    await updateDoc(ProviderTreasury, treasuryId, {
      isDeleted: true,
    });
  return { message: constants.DELETE_SUCCESS };
});
