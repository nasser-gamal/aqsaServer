import * as pagesRepository from '../../dataAccess/links/pagesRepository.js';
import * as systemMenuRepository from '../../dataAccess/links/systemMenuRepository.js';

import BadRequestError from '../../utils/badRequestError.js';
import constants from '../../utils/constants.js';

import { checkResourceExists } from '../../utils/checkResourceExists.js';
import deleteFile from '../../utils/deleteFile.js';
import imgPath from '../../utils/filePath.js';
import { Op } from 'sequelize';

const isPageExist = async (pageId) => {
  const page = await pagesRepository.findById(pageId);
  return checkResourceExists(page, constants.PAGE_NOT_FOUND);
};

const isLinkExist = async (linkId) => {
  const link = await systemMenuRepository.findById(linkId);
  return checkResourceExists(link, constants.LINK_NOT_FOUND);
};

export const createPage = async (data) => {
  const { title, img, pageURL, order, linkId } = data;

  if (!img) {
    throw new BadRequestError(constants.IMG_REQUIRED, 400);
  }

  const link = await isLinkExist(linkId);

  const existPage = await pagesRepository.findOne({ title });

  if (existPage) {
    throw new BadRequestError(constants.PAGE_EXIST);
  }

  const imgURL = imgPath(img);

  await pagesRepository.createOne({
    title,
    imgURL,
    pageURL,
    order,
    systemMenuId: link.id,
  });

  return { message: constants.CREATE_PAGE_SUCCESS };
};

export const updatePage = async (pageId, data) => {
  const { title, img, pageURL, order, linkId } = data;

  await isPageExist(pageId);
  const link = await isLinkExist(linkId);

  const query = { [Op.and]: { id: { [Op.ne]: pageId }, title: title } };

  const existData = await pagesRepository.findOne(query);

  if (existData) {
    throw new BadRequestError(constants.PAGE_EXIST);
  }

  if (img) {
    deleteFile(link.imgURL);
  }

  const imgURL = img ? imgPath(img) : link.imgURL;

  await pagesRepository.updateOne(pageId, {
    title,
    imgURL,
    pageURL,
    order,
    systemMenuId: link.id,
  });

  return { message: constants.UPDATE_PAGE_SUCCESS };
};

export const deletePage = async (pageId) => {
  await isPageExist(pageId);
  await pagesRepository.deleteOne(pageId);
  return { message: constants.DELETE_PAGE_SUCCESS };
};

export const getAllPages = async () => {
  const pages = await pagesRepository.findAll();
  return { pages };
};

export const getPage = async (pageId) => {
  const pages = await pagesRepository.findById(pageId);
  return { pages };
};
