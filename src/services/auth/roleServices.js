import * as userRepository from '../../dataAccess/auth/userRepository.js';
import * as roleRepository from '../../dataAccess/auth/roleRepository.js';

import constants from '../../utils/constants.js';
import { checkResourceExists } from '../../utils/checkResourceExists.js';
import BadRequestError from '../../utils/badRequestError.js';

const isRoleExists = async (roleId) => {
  const role = await roleRepository.findById(roleId);
  return checkResourceExists(role, constants.ROLE_NOT_FOUND);
};

const isRoleNameExists = async (name) => {
  const roleNameExists = await roleRepository.findOne({ name });
  return roleNameExists;
};

export const getAllRoles = async () => {
  const roles = await roleRepository.findAll();
  return { roles };
};

export const getRoleById = async (roleId) => {
  const role = await roleRepository.findById(roleId);
  return { role };
};

export const createRole = async (roleData) => {
  const { name, nameAr } = roleData;

  const roleNameExists = await isRoleNameExists(name);

  if (roleNameExists) {
    throw new BadRequestError(constants.ROLE_EXIST);
  }

  await roleRepository.createOne({ name, nameAr });

  return { message: constants.CREATE_ROLE_SUCCESS };
};

export const updateRole = async (roleId, roleData) => {
  const { name, nameAr } = roleData;

  await isRoleExists(roleId);

  await roleRepository.updateOne(roleId, { name, nameAr });

  return { message: constants.UPDATE_ROLE_SUCCESS };
};

export const deleteRole = async (roleId) => {
  await isRoleExists(roleId);
  await roleRepository.deleteOne(roleId);
  return { message: constants.DELETE_ROLE_SUCCESS };
};
