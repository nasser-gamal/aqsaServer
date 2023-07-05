import * as systemMenuRepository from '../../dataAccess/links/systemMenuRepository.js';


import BadRequestError from '../../utils/badRequestError.js';
import deleteFile from '../../utils/deleteFile.js';
import constants from '../../utils/constants.js';
import imgPath from '../../utils/filePath.js';
import { checkResourceExists } from '../../utils/checkResourceExists.js';


import { Op } from 'sequelize';

const isLinkExist = async (linkId) => {
  const link = await systemMenuRepository.findById(linkId);
  return checkResourceExists(link, constants.LINK_NOT_FOUND);
};

export const createLink = async (data) => {
  const { title, pageURL, img, isLink, order } = data;

  if (!img) {
    throw new BadRequestError(constants.IMG_REQUIRED, 400);
  }

  const imgURL = imgPath(img);

  const existLink = await systemMenuRepository.findOne({ title });

  if (existLink) {
    throw new BadRequestError(constants.LINK_EXIST);
  }

  await systemMenuRepository.createOne({
    title,
    imgURL,
    pageURL,
    isLink,
    order,
  });

  return { message: constants.CREATE_LINK_SUCCESS };
};

export const updateLink = async (linkId, data) => {
  const { title, pageURL, img, isLink, order } = data;

  const link = await isLinkExist(linkId);

  const query = { [Op.and]: { id: { [Op.ne]: linkId }, title: title } };

  const existData = await systemMenuRepository.findOne(query);

  if (existData) {
    throw new BadRequestError(constants.LINK_EXIST);
  }

  if (img) {
    deleteFile(link.imgURL);
  }

  const imgURL = img ? imgPath(img) : link.imgURL;

  await systemMenuRepository.updateOne(linkId, {
    title,
    pageURL,
    imgURL,
    isLink,
    order,
  });

  return { message: constants.UPDATE_LINK_SUCCESS };
};

export const deleteLink = async (linkId) => {
  const link = await isLinkExist(linkId);

  await systemMenuRepository.deleteOne(linkId);

  return { message: constants.DELETE_LINK_SUCCESS };
};

export const getAllLinks = async () => {
  const links = await systemMenuRepository.findAll();
  return { links };
};

export const getLink = async (linkId) => {
  const link = await isLinkExist(linkId);
  return { link };
};
