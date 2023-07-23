const User = require('../../models/auth/userModel.js');
const Category = require('../../models/category/categoryModel.js');
const Segment = require('../../models/segments/segmentsModel.js');
const { pagination } = require('../../utils/pagination.js');

exports.createOne = async (data) => {
  try {
    const segment = await Segment.create(data);
    return segment;
  } catch (err) {
    throw new Error(err);
  }
};

exports.updateOne = async (segmentId, data) => {
  try {
    const segment = await Segment.update(
      {
        ...data,
      },
      { where: { id: segmentId } }
    );
    return segment;
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteOne = async (segmentId) => {
  try {
    const segment = await Segment.destroy({
      where: { id: segmentId },
    });
    return segment;
  } catch (err) {
    throw new Error(err);
  }
};

exports.findAll = async (whereClause, page, limit, order, sort) => {
  try {
    const pageNumber = +page || 1;
    const itemPerPage = +limit || 10;
    const orderBy = order || 'createdAt';
    const sortBy = sort || 'ASC';

    const segments = await Segment.findAndCountAll({
      where: whereClause,
      order: [[orderBy, sortBy]],
      limit: itemPerPage,
      offset: (pageNumber - 1) * itemPerPage,
      attributes: { exclude: ['createdBy', 'serviceId'] },
      include: [
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
      ],
    });
    return {
      segments: segments.rows,
      pagination: pagination(pageNumber, itemPerPage, segments.count),
    };
  } catch (err) {
    throw new Error(err);
  }
};

exports.findById = async (segmentId) => {
  try {
    const segment = await Segment.findByPk(segmentId, {
      attributes: { exclude: ['createdBy', 'serviceId'] },
      include: [
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
      ],
    });
    return segment;
  } catch (err) {
    throw new Error(err);
  }
};

exports.findOne = async (query) => {
  try {
    const segment = await Segment.findOne({
      where: query,
      attributes: { exclude: ['createdBy', 'serviceId'] },
      include: [
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
      ],
    });
    return segment;
  } catch (err) {
    throw new Error(err);
  }
};
