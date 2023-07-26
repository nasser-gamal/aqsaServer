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

const isUserExist = async (agentId) => {
  const user = await userRepository.findById(agentId);
  return checkResourceExists(user, constants.USER_NOT_FOUND);
};

const comparePassword = async (user, password) => {
  const matchPassword = await user.comparePassword(password);

  if (!matchPassword) {
    throw new BadRequestError(constants.LOGIN_WRONG, 400);
  }

  return matchPassword;
};

const isDataTaken = async (
  userId,
  phoneNumber,
  email,
  accountNumber,
  nationalId
) => {
  const query = { phoneNumber, accountNumber, nationalId };
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

exports.createAgent = async (userData) => {
  const {
    userName,
    accountName,
    email,
    phoneNumber,
    address,
    accountNumber,
    nationalId,
  } = userData;

  const query = { phoneNumber, accountNumber, nationalId };
  if (email) {
    query.email = email;
  }
  const whereClause = { [Op.or]: query };

  const agentExist = await userRepository.findOne(whereClause);

  if (agentExist) {
    throw new BadRequestError(constants.USER_EXIST);
  }

  // Generate Rendom Passwordّ
  const password = generatePassword();

  const user = await userRepository.createOne({
    userName,
    accountName,
    phoneNumber,
    address,
    email,
    accountNumber,
    nationalId,
    password,
    roleId: 3,
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

exports.updateAgent = async (userId, userData) => {
  const {
    userName,
    accountName,
    email,
    phoneNumber,
    address,
    accountNumber,
    nationalId,
  } = userData;

  await isUserExist(userId);

  await isDataTaken(userId, phoneNumber, email, accountNumber, nationalId);

  await userRepository.updateOne(userId, {
    userName,
    accountName,
    phoneNumber,
    address,
    accountNumber,
    nationalId,
  });

  return { message: constants.UPDATE_USER_SUCCESS };
};


exports.updatePasswordManual = async (userId, body) => {
  const { password } = body;
  const user = await isUserExist(userId);

  const hashPassword = await user.hashPassword(password);

  await userRepository.updateOne(userId, {
    password: hashPassword,
  });

  return { message: constants.UPDATE_PASSWORD_SUCCESS };
};

exports.updatePassword = async (agentId) => {
  const user = await isUserExist(agentId);

  const password = generatePassword();

  let message = `الرقم السري الخاص بك ${password}`;

  const hashPassword = await user.hashPassword(password);

  await userRepository.updateOne(agentId, {
    password: hashPassword,
  });

  await sendSMSMessage(user.phoneNumber, message);

  

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

exports.deleteAgent = async (userId) => {
  await isUserExist(userId);

  await userRepository.updateOne(userId, { isActive: false });

  return { message: constants.DELETE_USER_SUCCESS };
};

exports.getAllAgents = async () => {
  const users = await userRepository.findAll({ name: 'agent' });

  return { users };
};
