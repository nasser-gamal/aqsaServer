const asyncHandler = require('express-async-handler');
const userRepository = require('../dataAccess/auth/userRepository.js');
const constants = require('../utils/constants.js');
const generatePassword = require('../utils/generatePassword.js');
const { checkResourceExists } = require('../utils/checkResourceExists.js');
const { sendSMSMessage } = require('../utils/sms.js');
const { createDoc, getDocs, updateDoc, getDoc } = require('./factory.js');
const User = require('../models/userModel');
const Role = require('../models/roleModel');
const { sequelize } = require('../config/database.js');

exports.createUser = asyncHandler(async (data) => {
  // Generate Rendom Passwordّ
  data.password = generatePassword();
  const doc = await createDoc(User, data);

  let message = `الرقم السري الخاص بك ${data.password}`;

  const response = await sendSMSMessage(phoneNumber, message);
  // if (response.code !== 1901) {
  //   throw new BadRequestError(constants.SMS_ERROR);
  // }

  return {
    message: constants.CREATE_USER_SUCCESS,
    password: data.password,
    doc,
  };
});

exports.getUsers = asyncHandler(async (query, filterObj) => {
  return getDocs(User, query, filterObj, [
    { model: Role, attributes: { include: ['id', 'nameAr'] } },
  ]);
});

exports.getUser = asyncHandler(async (userId) => {
  return getDoc(User, userId, { exclude: ['password'] }, [
    { model: Role, attributes: { include: ['id', 'nameAr'] } },
  ]);
});

exports.updateUser = asyncHandler(async (userId, data) => {
  const doc = await updateDoc(User, userId, data);
  return { message: constants.UPDATE_USER_SUCCESS, doc };
});

exports.updatePasswordManual = asyncHandler(async (userId, body) => {
  const { password } = body;

  const user = await getDoc(User, userId);
  const hashPassword = await user.hashPassword(password);

  await updateDoc(User, userId, {
    password: hashPassword,
  });

  return { message: constants.UPDATE_PASSWORD_SUCCESS };
});

exports.updatePassword = asyncHandler(async (userId) => {
  const user = await getDoc(User, userId);

  const password = generatePassword();
  const hashPassword = await user.hashPassword(password);
  await updateDoc(User, userId, { password: hashPassword });

  // send password as SMS Message to the user
  let message = `الرقم السري الخاص بك ${password}`;
  await sendSMSMessage(user.phoneNumber, message);

  return { message: constants.UPDATE_PASSWORD_SUCCESS };
});

exports.updateStatus = asyncHandler(async (userId) => {
  await updateDoc(User, userId, {
    isActive: sequelize.literal('NOT isActive'),
  });

  const user = await getDoc(User, userId);
  const message = user.isActive
    ? constants.ACCOUNT_IN_ACTIVE
    : constants.ACCOUNT_ACTIVE;
  return { message };
});

exports.deleteUser = asyncHandler(async (userId) => {
  await updateDoc(User, userId, { isActive: false, isDeleted: true });
  return { message: constants.DELETE_USER_SUCCESS };
});
