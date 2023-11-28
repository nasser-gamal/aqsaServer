const constants = require('../utils/constants.js');
const asyncHandler = require('express-async-handler');
const {
  createDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
} = require('./factory.js');
const { Bank, User } = require('../models/index.js');

exports.createBank = asyncHandler(async (data) => {
  await createDoc(Bank, data);
  return { message: constants.CREATE_BANK_SUCCESS };
});

exports.getBanks = asyncHandler(async (query, filterObj) =>
  getDocs(Bank, query, filterObj, [
    {
      model: User,
      as: 'creator',
      attributes: ['id', 'userName', 'accountName'],
    },
    {
      model: User,
      as: 'editor',
      attributes: ['id', 'userName', 'accountName'],
    },
  ])
);

exports.getBank = async (bankId) => getDoc(Bank, bankId);

exports.updateBank = asyncHandler(async (bankId, data) => {
  await updateDoc(Bank, bankId, data);
  return { message: constants.UPDATE_BANK_SUCCESS };
});

exports.deleteBank = asyncHandler(async (bankId) => {
  await updateDoc(Bank, bankId, { isDeleted: true });
  return { message: constants.DELETE_BANK_SUCCESS };
});
