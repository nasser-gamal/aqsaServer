const asyncHandler = require('express-async-handler');
const constants = require('../utils/constants');
const AddionalTreasury = require('../models/addionalTreasuryModel');
const {
  createDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
} = require('./factory');

exports.createAddTreasury = asyncHandler(async (data) => {
  await createDoc(AddionalTreasury, data);
  return { message: constants.CREATE_SUCCESS };
});

exports.getAddTreasuries = asyncHandler(async (query, filterObj) =>
  getDocs(AddionalTreasury, query, filterObj)
);

exports.getAddTreasury = asyncHandler(async (treasuryId) =>
  getDoc(AddionalTreasury, treasuryId)
);

exports.updateAddTreasury = asyncHandler(async (treasuryId, data) => {
  await updateDoc(AddionalTreasury, treasuryId, data);
  return { message: constants.UPDATE_SUCCESS };
});

exports.deleteAddTreasury = asyncHandler(async (treasuryId) => {
  await updateDoc(AddionalTreasury, treasuryId, { isDeleted: true });
  return { message: constants.DELETE_SUCCESS };
});
