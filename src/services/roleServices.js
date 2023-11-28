const asyncHandler = require('express-async-handler');
const constants = require('../utils/constants.js');
const {
  createDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
} = require('./factory.js');
const Role = require('../models/roleModel');

exports.createRole = asyncHandler(async (data) => {
  await createDoc(Role, data);
  return { message: constants.CREATE_ROLE_SUCCESS };
});

exports.getRoles = asyncHandler(async (query) => getDocs(Role, query, {}));

exports.getRole = asyncHandler(async (roleId) => getDoc(Role, roleId));

exports.updateRole = asyncHandler(async (roleId, data) => {
  await updateDoc(Role, roleId, data);
  return { message: constants.UPDATE_ROLE_SUCCESS };
});

exports.deleteRole = asyncHandler(async (roleId) => {
  await updateDoc(Role, roleId, {
    isDeleted: true,
  });
  return { message: constants.DELETE_ROLE_SUCCESS };
});
