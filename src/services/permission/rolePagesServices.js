import * as systemMenuRepository from '../../dataAccess/links/systemMenuRepository.js';
import * as roleRepository from '../../dataAccess/auth/roleRepository.js';
import * as rolePagesRepository from '../../dataAccess/permission/rolePagesRepository.js';

import { checkResourceExists } from '../../utils/checkResourceExists.js';
import constants from '../../utils/constants.js';

const isLinkExist = async (linkId) => {
  const page = await systemMenuRepository.findById(linkId);
  return checkResourceExists(page, constants.PAGE_NOT_FOUND);
};

const isRoleExist = async (roleId) => {
  const role = await roleRepository.findById(roleId);
  return checkResourceExists(role, constants.ROLE_NOT_FOUND);
};

export const createRolePage = async (data) => {
  const { linkId, roleId } = data;

  await isRoleExist(roleId);
  await isLinkExist(linkId);

  await rolePagesRepository.createOne({
    systemMenuId: linkId,
    roleId,
  });

  return { message: constants.CREATE_PERMISSION_SUCCESS };
};

export const updatePermmission = async (data) => {
  const { links, roleId } = data;

  await isRoleExist(roleId);

  links.map(async (linkId) => {
    await isLinkExist(linkId);
    await rolePagesRepository.updateOne({
      linkId,
      roleId,
    });
  });

  return { message: constants.CREATE_PERMISSION_SUCCESS };
};

export const deletePermmission = async (permissionId) => {
  await isLinkExist(linkId);
  await isRoleExist(roleId);

  await rolePagesRepository.deleteOne(permissionId);

  return { message: constants.DELETE_PERMISSION_SUCCESS };
};

export const findAllPermmissions = async (roleId) => {
  const permissions = await rolePagesRepository.findAll({ roleId });
  return { permissionPages: permissions };
};
