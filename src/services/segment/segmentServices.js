import * as segmentsRepository from '../../dataAccess/segment/segmentsRepository.js';
import * as categoryRepository from '../../dataAccess/category/categoryRepository.js';

import BadRequestError from '../../utils/badRequestError.js';
import { checkResourceExists } from '../../utils/checkResourceExists.js';
import constants from '../../utils/constants.js';

import { Op } from 'sequelize';

const isCategoryExist = async (serviceId) => {
  const category = await categoryRepository.findById(serviceId);
  return checkResourceExists(category, constants.CATEGORY_NOT_FOUND);
};

const isSegmentExist = async (query) => {
  const segment = await segmentsRepository.findOne(query);
  return segment;
};

export const createSegment = async (userId, data) => {
  const { title, start, end, percentage, note, serviceId } = data;

  await isCategoryExist(serviceId);
  const existSegment = await isSegmentExist({ title, serviceId });

  if (existSegment) {
    throw new BadRequestError(constants.SEGMENT_EXIST);
  }

  await segmentsRepository.createOne({
    title,
    start,
    end: end || null,
    percentage,
    note,
    serviceId,
    createdBy: userId,
  });

  return { message: constants.CREATE_SEGMENT_SUCCESS };
};

export const updateSegment = async (segmentId, data) => {
  const { title, start, end, percentage, note, serviceId, userId } = data;

  await isCategoryExist(serviceId);

  const segment = await isSegmentExist({ id: segmentId });
  checkResourceExists(segment, constants.SEGEMNT_NOT_FOUND);

  const query = {
    [Op.and]: {
      id: { [Op.ne]: segmentId },
      title,
      serviceId,
    },
  };
  const existSegment = await isSegmentExist(query);

  console.log('------------------------------------', existSegment);

  if (existSegment) {
    throw new BadRequestError(constants.SEGMENT_EXIST);
  }

  await segmentsRepository.updateOne(segmentId, {
    title,
    start,
    end,
    percentage,
    note,
    serviceId,
    createdBy: userId,
  });

  return { message: constants.UPDATE_SEGMENT_SUCCESS };
};

export const deleteSegment = async (segmentId) => {
  const segment = await isSegmentExist({ id: segmentId });
  checkResourceExists(segment, constants.SEGEMNT_NOT_FOUND);

  await segmentsRepository.deleteOne(segmentId);
  return { message: constants.DELETE_SEGMENT_SUCCESS };
};

export const findAllSegments = async () => {
  const segments = await segmentsRepository.findAll();
  return { segments };
};

export const findSegmentById = async (segmentId) => {
  const segment = await segmentsRepository.findById(segmentId);
  checkResourceExists(segment, constants.SEGEMNT_NOT_FOUND);
  return { segment };
};
