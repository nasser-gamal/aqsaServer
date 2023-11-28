const asyncHandler = require('express-async-handler');
const constants = require('../utils/constants');
const Dues = require('../models/duesModel');
const {
  createDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
} = require('./factory');

exports.createDues = asyncHandler(async (data) => {
  await createDoc(Dues, data);
  return { message: constants.CREATE_SUCCESS };
});

exports.getDues = asyncHandler(async (query) => getDocs(Dues, query, {}));
exports.getDue = asyncHandler(async (dueId) => getDoc(Dues, dueId));

exports.updateDues = asyncHandler(async (dueId, data) => {
  await updateDoc(Dues, dueId, data);
  return { message: constants.UPDATE_SUCCESS };
});

exports.deleteDues = asyncHandler(async (dueId) => {
  await updateDoc(Dues, dueId, { isDeleted: true });
  return { message: constants.DELETE_SUCCESS };
});
