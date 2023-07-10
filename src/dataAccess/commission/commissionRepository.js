const User = require('../../models/auth/userModel');
const Category = require('../../models/category/categoryModel');
const Commission = require('../../models/commission/commissionModel');
const Segment = require('../../models/segments/segmentsModel');
const { pagination } = require('../../utils/pagination');

exports.createMany = async (data) => {
  try {
    const commission = await Commission.bulkCreate(data);
    return commission;
  } catch (err) {
    throw new Error(err);
  }
};

exports.createOne = async (data) => {
  try {
    const commission = await Commission.create(data);
    return commission;
  } catch (err) {
    throw new Error(err);
  }
};

exports.updateOne = async (commissionId, data) => {
  try {
    const commission = await Commission.update(
      {
        ...data,
      },
      { where: { id: commissionId } }
    );
    return commission;
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteOne = async (commissionId) => {
  try {
    const commission = await Commission.destroy({
      where: { id: commissionId },
    });
    return commission;
  } catch (err) {
    throw new Error(err);
  }
};

exports.findAll = async (
  whereClause,
  commissionQuery,
  page,
  limit,
  order,
  sort
) => {
  try {
    const pageNumber = +page || 1;
    const itemPerPage = +limit || 1000;
    const orderBy = order || 'createdAt';
    const sortBy = sort || 'DESC';

    const commissions = await Commission.findAndCountAll({
      where: commissionQuery,
      order: [[orderBy, sortBy]],
      limit: itemPerPage,
      offset: (pageNumber - 1) * itemPerPage,
      
      attributes: { exclude: ['createdBy', 'segmentId', 'agentId'] },
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'userName', 'accountName'],
        },
        {
          model: User,
          where: whereClause,
          as: 'agent',
          attributes: { exclude: ['password'] },
        },
        {
          model: Segment,
          as: 'segment',
          attributes: ['id', 'title', 'start', 'end', 'percentage'],
          include: [
            {
              model: Category,
              as: 'service',
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    });
    return {
      commissions: commissions.rows,
      pagination: pagination(pageNumber, itemPerPage, commissions.count),
    };
  } catch (err) {
    throw new Error(err);
  }
};

exports.findById = async (commissionId) => {
  try {
    const commissions = await Commission.findByPk(commissionId, {
      attributes: { exclude: ['createdBy', 'segmentId', 'agentId'] },
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'userName', 'accountName'],
        },
        {
          model: User,
          as: 'agent',
          attributes: ['id', 'userName', 'accountName'],
        },
        {
          model: Segment,
          as: 'segment',
          attributes: ['id', 'title', 'start', 'end', 'percentage'],
          include: [
            {
              model: Category,
              as: 'service',
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    });
    return commissions;
  } catch (err) {
    throw new Error(err);
  }
};

exports.findOne = async (query) => {
  try {
    const commission = await Commission.findOne({
      where: query,
      // attributes: { exclude: ['createdBy', 'serviceId'] },
      // include: [
      //   {
      //     model: User,
      //     as: 'creator',
      //     attributes: ['id', 'userName', 'accountName'],
      //   },
      //   {
      //     model: Category,
      //     as: 'service',
      //     attributes: ['id', 'name'],
      //   },
      // ],
    });
    return commission;
  } catch (err) {
    throw new Error(err);
  }
};
