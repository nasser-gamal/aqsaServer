const userRepository = require('../../dataAccess/auth/userRepository.js');
const roleRepository = require('../../dataAccess/auth/roleRepository.js');

const constants = require('../../utils/constants.js');
const { checkResourceExists } = require('../../utils/checkResourceExists.js');
const BadRequestError = require('../../utils/badRequestError.js');

const isRoleExists = async (roleId) => {
  const role = await roleRepository.findById(roleId);
  return checkResourceExists(role, constants.ROLE_NOT_FOUND);
};

const isRoleNameExists = async (name) => {
  const roleNameExists = await roleRepository.findOne({ name });
  return roleNameExists;
};

exports.getAllRoles = async () => {
  const roles = await roleRepository.findAll();
  return { roles };
};

exports.getRoleById = async (roleId) => {
  const role = await roleRepository.findById(roleId);
  return { role };
};

exports.createRole = async (roleData) => {
  const { name, nameAr } = roleData;

  const roleNameExists = await isRoleNameExists(name);

  if (roleNameExists) {
    throw new BadRequestError(constants.ROLE_EXIST);
  }

  await roleRepository.createOne({ name, nameAr });

  return { message: constants.CREATE_ROLE_SUCCESS };
};

exports.updateRole = async (roleId, roleData) => {
  const { name, nameAr } = roleData;

  await isRoleExists(roleId);

  await roleRepository.updateOne(roleId, { name, nameAr });

  return { message: constants.UPDATE_ROLE_SUCCESS };
};

exports.deleteRole = async (roleId) => {
  await isRoleExists(roleId);
  await roleRepository.deleteOne(roleId);
  return { message: constants.DELETE_ROLE_SUCCESS };
};
