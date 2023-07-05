import * as systemMenuRepository from '../../dataAccess/links/systemMenuRepository.js';
import * as roleRepository from '../../dataAccess/auth/roleRepository.js';
import * as permissionsRepostory from '../../dataAccess/permission/permissionsRepostory.js';

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

export const createPermmission = async (data) => {
  const { links, roleId } = data;

  console.log(data)
  await isRoleExist(roleId);

  links.map(async (linkId) => {
    await isLinkExist(linkId);
  });

  await permissionsRepostory.createOne({
    linkId,
    roleId,
  });

  return { message: constants.CREATE_PERMISSION_SUCCESS };
};

export const updatePermmission = async (data) => {
  const { links, roleId } = data;

  await isRoleExist(roleId);

  links.map(async (linkId) => {
    await isLinkExist(linkId);
    await permissionsRepostory.updateOne({
      linkId,
      roleId,
    });
  });

  return { message: constants.CREATE_PERMISSION_SUCCESS };
};

export const deletePermmission = async (permissionId) => {
  await isLinkExist(linkId);
  await isRoleExist(roleId);

  await permissionsRepostory.deleteOne(permissionId);

  return { message: constants.DELETE_PERMISSION_SUCCESS };
};

export const findAllPermmissions = async (roleId) => {
  const permissions = await permissionsRepostory.findAll({ roleId });
  return { permissionPages: permissions };
};
