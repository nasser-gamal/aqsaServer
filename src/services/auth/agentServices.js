import * as userRepository from '../../dataAccess/auth/userRepository.js';
import * as roleRepository from '../../dataAccess/auth/roleRepository.js';

import BadRequestError from '../../utils/badRequestError.js';
import constants from '../../utils/constants.js';
import generatePassword from '../../utils/generatePassword.js';
import { checkResourceExists } from '../../utils/checkResourceExists.js';
import { sendSMSMessage } from '../../utils/sms.js';
import { Op } from 'sequelize';

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

export const createAgent = async (userData) => {
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
  // const response = await sendSMSMessage(phoneNumber, message);

  // console.log(response);

  return {
    message: constants.CREATE_USER_SUCCESS,
    password: password,
    userId: user.id,
  };
};

export const updateAgent = async (userId, userData) => {
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
  console.log(userId);

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

export const updatePassword = async (userId) => {
  const user = await isUserExist(userId);

  // await comparePassword(user, password);

  const password = generatePassword();

  let message = `الرقم السري الخاص بك ${password}`;

  const hashPassword = await user.hashPassword(password);

  await userRepository.updateOne(userId, {
    password: hashPassword,
  });

  // const response = await sendSMSMessage(user.phoneNumber, message);
  // console.log(response);
  // if (response.code !== 1901) {
  //   throw new BadRequestError(constants.SMS_ERROR);
  // }

  return { message: constants.UPDATE_PASSWORD_SUCCESS };
};

export const updateStatus = async (userId) => {
  const user = await isUserExist(userId);

  await userRepository.updateOne(userId, { isActive: !user.isActive });

  const message = user.isActive
    ? constants.ACCOUNT_IN_ACTIVE
    : constants.ACCOUNT_ACTIVE;

  return { message };
};

export const deleteAgent = async (userId) => {
  await isUserExist(userId);

  await userRepository.deleteOne(userId);

  return { message: constants.DELETE_USER_SUCCESS };
};

export const getAllAgents = async () => {
  console.log(
    '0-----------------------------------------------------------------------------------'
  );
  const users = await userRepository.findAll({
    name: 'agent',
    // isActive: true,
  });

  return { users };
};
