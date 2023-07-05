import User from '../../models/auth/userModel.js';
import Category from '../../models/category/categoryModel.js';
import Segment from '../../models/segments/segmentsModel.js';
import { pagination } from '../../utils/pagination.js';

export const createOne = async (data) => {
  try {
    const segment = await Segment.create(data);
    return segment;
  } catch (err) {
    throw new Error(err);
  }
};

export const updateOne = async (segmentId, data) => {
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

export const deleteOne = async (segmentId) => {
  try {
    const segment = await Segment.destroy({
      where: { id: segmentId },
    });
    return segment;
  } catch (err) {
    throw new Error(err);
  }
};

export const findAll = async (page, limit, order, sort, whereClause) => {
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

export const findById = async (segmentId) => {
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

export const findOne = async (query) => {
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
