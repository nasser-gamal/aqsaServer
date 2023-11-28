const constants = require('../utils/constants');
const asyncHandler = require('express-async-handler');
const {
  createDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
} = require('./factory.js');
const Segment = require('../models/segmentsModel');
const User = require('../models/userModel');
const Category = require('../models/categoryModel.js');

exports.createSegment = asyncHandler(async (data) => {
  await createDoc(Segment, data);
  return { message: constants.CREATE_SEGMENT_SUCCESS };
});
exports.getSegments = asyncHandler(async (query, filterObj) =>
  getDocs(Segment, query, filterObj, [
    {
      model: User,
      as: 'creator',
      attributes: ['id', 'userName', 'accountName'],
    },
    {
      model: Category,
      as: 'service',
      attributes: ['id', 'name'],
    },
  ])
);

exports.getSegment = asyncHandler(async (segmentId) =>
  getDoc(Segment, segmentId)
);

exports.updateSegment = asyncHandler(async (segmentId, data) => {
  await updateDoc(Segment, segmentId, data);
  return { message: constants.UPDATE_SEGMENT_SUCCESS };
});

exports.deleteSegment = asyncHandler(async (segmentId) => {
    await updateDoc(Segment, segmentId, {
      isDeleted: true,
    });
  return { message: constants.DELETE_SEGMENT_SUCCESS };
});
