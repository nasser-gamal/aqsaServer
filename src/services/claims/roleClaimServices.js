import * as roleRepository from '../../dataAccess/auth/roleRepository.js';
import * as roleClaimRepository from '../../dataAccess/claims/roleClaimRepository.js';

import { checkResourceExists } from '../../utils/checkResourceExists.js';
import constants from '../../utils/constants.js';

const isRoleExist = async (linkId) => {
  const role = await roleRepository.findById(linkId);
  return checkResourceExists(role, constants.ROLE_NOT_FOUND);
};


export const createPageClaim = async (data) => {
  const { claims, roleId } = data;

  await isRoleExist(roleId);

  claims.map((claim) => {
    roleClaimRepository.createOne({
      roleId,
      pageClaimId: claim.id,
    });
  });

  return { message: constants.CREATE_SUCCESS };
};

export const updatePageClaim = async (data) => {
  const { links, roleId } = data;

  await isRoleExist(roleId);

  links.map(async (linkId) => {
    await isLinkExist(linkId);
    await roleClaimRepository.updateOne({
      linkId,
      roleId,
    });
  });

  return { message: constants.CREATE_PERMISSION_SUCCESS };
};

export const deletePageClaim = async (permissionId) => {
  await isLinkExist(linkId);
  await isRoleExist(roleId);

  await roleClaimRepository.deleteOne(permissionId);

  return { message: constants.DELETE_PERMISSION_SUCCESS };
};

export const findAllPageClaims = async (roleId) => {
  const permissions = await roleClaimRepository.findAll({ roleId });
  return { permissionPages: permissions };
};
