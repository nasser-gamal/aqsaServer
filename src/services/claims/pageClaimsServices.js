import * as systemMenuRepository from '../../dataAccess/links/systemMenuRepository.js';
import * as pageClaimRepository from '../../dataAccess/claims/pageClaimRepository.js';

import { checkResourceExists } from '../../utils/checkResourceExists.js';
import constants from '../../utils/constants.js';

const isLinkExist = async (linkId) => {
  const page = await systemMenuRepository.findById(linkId);
  return checkResourceExists(page, constants.PAGE_NOT_FOUND);
};

export const createPageClaim = async (data) => {
  const { claims, systemMenuId } = data;
  await isLinkExist(systemMenuId);

  claims.map((claim) => {
    pageClaimRepository.createOne({
      systemMenuId,
      name: claim.nameEn,
      nameAr: claim.nameAr,
    });
  });

  return { message: constants.CREATE_SUCCESS };
};

export const updatePageClaim = async (data) => {
  const { links, roleId } = data;

  await isRoleExist(roleId);

  links.map(async (linkId) => {
    await isLinkExist(linkId);
    await pageClaimRepository.updateOne({
      linkId,
      roleId,
    });
  });

  return { message: constants.CREATE_PERMISSION_SUCCESS };
};

export const deletePageClaim = async (permissionId) => {
  await isLinkExist(linkId);
  await isRoleExist(roleId);

  await pageClaimRepository.deleteOne(permissionId);

  return { message: constants.DELETE_PERMISSION_SUCCESS };
};

export const findAllPageClaims = async (roleId) => {
  const permissions = await pageClaimRepository.findAll({ roleId });
  return { permissionPages: permissions };
};
