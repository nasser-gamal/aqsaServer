const constants = require('../utils/constants.js');
const Fees = require('../models/feesModel.js');
const asyncHandler = require('express-async-handler');
const {
  createDoc,
  getDocs,
  updateDoc,
  getDoc,
  deleteDoc,
} = require('./factory.js');
const User = require('../models/userModel.js');

exports.createFees = asyncHandler(async (data) => {
  await createDoc(Fees, data);
  return { message: constants.CREATE_FEES_SUCCESS };
});

exports.getFees = asyncHandler(async (query, queryObj) =>
  getDocs(Fees, query, queryObj, [
    {
      model: User,
      as: 'creator',
      attributes: ['id', 'userName', 'accountName'],
    },
  ])
);

exports.getFee = asyncHandler(async (feesId) => getDoc(Fees, feesId));

exports.updateFees = asyncHandler(async (feesId, data) => {
  await updateDoc(Fees, feesId, data);
  return { message: constants.UPDATE_FEES_SUCCESS };
});

exports.deleteFees = asyncHandler(async (feesId) => {
  await updateDoc(Fees, feesId, { isDeleted: true });
  return { message: constants.DELETE_FEES_SUCCESS };
});
