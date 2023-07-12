const User = require('../../models/auth/userModel');
const Category = require('../../models/category/categoryModel');
const UserCommission = require('../../models/commission/userCommission');
const Segment = require('../../models/segments/segmentsModel');
const { pagination } = require('../../utils/pagination');

exports.createMany = async (data) => {
  try {
    const userCommission = await UserCommission.bulkCreate(data);
    return userCommission;
  } catch (err) {
    throw new Error(err);
  }
};

exports.createOne = async (data) => {
  try {
    const userCommission = await UserCommission.create(data);
    return userCommission;
  } catch (err) {
    throw new Error(err);
  }
};

exports.updateOne = async (commissionId, data) => {
  try {
    const userCommission = await UserCommission.update(
      {
        ...data,
      },
      { where: { id: commissionId } }
    );
    return userCommission;
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteOne = async (commissionId) => {
  try {
    const userCommission = await UserCommission.destroy({
      where: { id: commissionId },
    });
    return userCommission;
  } catch (err) {
    throw new Error(err);
  }
};

exports.findAll = async (
  // whereClause,
  commissionQuery,
  page,
  limit,
  order,
  sort
) => {
  try {
    // const pageNumber = +page || 1;
    // const itemPerPage = +limit || 1000;
    // const orderBy = order || 'createdAt';
    // const sortBy = sort || 'DESC';

    const commissions = await UserCommission.findAndCountAll({
      // where: commissionQuery,
      // order: [[orderBy, sortBy]],
      // limit: itemPerPage,
      // offset: (pageNumber - 1) * itemPerPage,

      // attributes: { exclude: ['createdBy', 'agentId'] },
      // include: [
      //   {
      //     model: User,
      //     as: 'creator',
      //     attributes: ['id', 'userName', 'accountName'],
      //   },
      //   {
      //     model: User,
      //     where: whereClause,
      //     as: 'agent',
      //     attributes: { exclude: ['password'] },
      //   },
      //   {
      //     model: Segment,
      //     as: 'segment',
      //     attributes: ['id', 'title', 'start', 'end', 'percentage'],
      //     include: [
      //       {
      //         model: Category,
      //         as: 'service',
      //         attributes: ['id', 'name'],
      //       },
      //     ],
      //   },
      // ],
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
    const commissions = await UserCommission.findByPk(commissionId, {
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
      ],
    });
    return commissions;
  } catch (err) {
    throw new Error(err);
  }
};

exports.findOne = async (
  commissionQuery,
  whereClause,
 
) => {
  try {
    const userCommission = await UserCommission.findOne({
      where: commissionQuery,
      // order: [[orderBy, sortBy]],

      attributes: { exclude: ['createdBy', 'agentId'] },
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
          attributes: {
            exclude: [
              'password',
              'resetPasswordCode',
              'passwordCodeExpiration',
              'createdAt',
              'updatedAt',
              'roleId',
              'isActive',
            ],
          },
        },
      ],
    });
    return { userCommission };
  } catch (err) {
    throw new Error(err);
  }
};
