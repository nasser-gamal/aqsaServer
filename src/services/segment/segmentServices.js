const segmentsRepository = require('../../dataAccess/segment/segmentsRepository.js');
const categoryRepository = require('../../dataAccess/category/categoryRepository.js');

const BadRequestError = require('../../utils/badRequestError.js');
const { checkResourceExists } = require('../../utils/checkResourceExists.js');
const constants = require('../../utils/constants.js');

const { Op } = require('sequelize');

const isCategoryExist = async (serviceId) => {
  const category = await categoryRepository.findById(serviceId);
  return checkResourceExists(category, constants.CATEGORY_NOT_FOUND);
};

const isSegmentExist = async (query) => {
  const segment = await segmentsRepository.findOne(query);
  return segment;
};

exports.createSegment = async (userId, data) => {
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

exports.updateSegment = async (segmentId, data) => {
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

exports.deleteSegment = async (segmentId) => {
  const segment = await isSegmentExist({ id: segmentId });
  checkResourceExists(segment, constants.SEGEMNT_NOT_FOUND);

  await segmentsRepository.deleteOne(segmentId);
  return { message: constants.DELETE_SEGMENT_SUCCESS };
};

exports.findAllSegments = async (query) => {
  const { page, limit, order, sort } = query;
  const segments = await segmentsRepository.findAll(
    undefined,
    page,
    limit,
    order,
    sort
  );
  return { segments };
};

exports.findSegmentById = async (segmentId) => {
  const segment = await segmentsRepository.findById(segmentId);
  checkResourceExists(segment, constants.SEGEMNT_NOT_FOUND);
  return { segment };
};
