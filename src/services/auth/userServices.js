const userRepository = require('../../dataAccess/auth/userRepository.js');
const roleRepository = require('../../dataAccess/auth/roleRepository.js');

const BadRequestError = require('../../utils/badRequestError.js');
const constants = require('../../utils/constants.js');
const generatePassword = require('../../utils/generatePassword.js');
const { checkResourceExists } = require('../../utils/checkResourceExists.js');
const { sendSMSMessage } = require('../../utils/sms.js');
const { Op } = require('sequelize');


const isRoleExist = async (roleId) => {
  const role = await roleRepository.findById(roleId);
  return checkResourceExists(role, constants.ROLE_NOT_FOUND);
};

const isUserExist = async (userId) => {
  const user = await userRepository.findById(userId);
  return checkResourceExists(user, constants.USER_NOT_FOUND);
};

const comparePassword = async (user, password) => {
  const matchPassword = await user.comparePassword(password);

  if (!matchPassword) {
    throw new BadRequestError(constants.LOGIN_WRONG, 400);
  }

  return matchPassword;
};

const isDataTaken = async (userId, phoneNumber, email) => {
  const query = { phoneNumber };
  if (email) {
    query.email = email;
  }

  const whereClause = {
    [Op.and]: [{ [Op.or]: query }, { id: { [Op.ne]: userId } }],
  };

  const user = await userRepository.findOne(whereClause);

  if (user) {
    throw new BadRequestError(constants.USER_EXIST);
  }
};

exports.createUser = async (userData) => {
  const { userName, accountName, email, phoneNumber, address } = userData;

  // await isRoleExist(roleId);

  const query = { phoneNumber };
  if (email) {
    query.email = email;
  }
  const whereClause = { [Op.or]: query };

  const userExist = await userRepository.findOne(whereClause);

  if (userExist) {
    throw new BadRequestError(constants.USER_EXIST);
  }

  // Generate Rendom Passwordّ
  const password = generatePassword();

  const user = await userRepository.createOne({
    userName,
    accountName,
    phoneNumber,
    address,
    password,
    email,
    roleId: 2,
  });

  let message = `الرقم السري الخاص بك ${password}`;

  const response = await sendSMSMessage(phoneNumber, message);
  if (response.code !== 1901) {
    throw new BadRequestError(constants.SMS_ERROR);
  }

  return {
    message: constants.CREATE_USER_SUCCESS,
    password: password,
    userId: user.id,
  };
};

exports.updateUser = async (userId, userData) => {
  const {
    userName,
    accountName,
    email,
    phoneNumber,
    address,
    // roleId,
    accountNumber,
    nationalId,
  } = userData;

  // await isRoleExist(roleId);
  await isUserExist(userId);

  await isDataTaken(userId, phoneNumber, email, accountNumber, nationalId);

  await userRepository.updateOne(userId, {
    userName,
    accountName,
    phoneNumber,
    address,
    accountNumber,
    nationalId,
    // roleId,
  });

  return { message: constants.UPDATE_USER_SUCCESS };
};

exports.updatePassword = async (userId) => {
  const user = await isUserExist(userId);

  // await comparePassword(user, password);

  const password = generatePassword();

  let message = `الرقم السري الخاص بك ${password}`;

  const hashPassword = await user.hashPassword(password);

  await userRepository.updateOne(userId, {
    password: hashPassword,
  });
 await sendSMSMessage(user.phoneNumber, message);

  // if (response.code !== 1901) {
  //   throw new BadRequestError(constants.SMS_ERROR);
  // }

  return { message: constants.UPDATE_PASSWORD_SUCCESS };
};

exports.updateStatus = async (userId) => {
  const user = await isUserExist(userId);

  await userRepository.updateOne(userId, { isActive: !user.isActive });

  const message = user.isActive
    ? constants.ACCOUNT_IN_ACTIVE
    : constants.ACCOUNT_ACTIVE;

  return { message };
};

exports.deleteUser = async (userId) => {
  await isUserExist(userId);

  await userRepository.updateOne(userId, { isActive: false });

  return { message: constants.DELETE_USER_SUCCESS };
};

exports.getAllAdmins = async () => {
  const users = await userRepository.findAll(
    { name: 'admin' }
  );
  return { users };
};
