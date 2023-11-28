const { Sequelize } = require('sequelize');
const User = require('../../models/userModel');
const Category = require('../../models/categoryModel');
const Commission = require('../../models/commission/commissionModel');
const UserCommission = require('../../models/commission/CommissionItems');
const Segment = require('../../models/segmentsModel');
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
  commissionQuery
  // page,
  // limit,
  // order,
  // sort
) => {
  try {
    // const pageNumber = +page || 1;
    // const itemPerPage = +limit || 1000;
    // const orderBy = order || 'createdAt';
    // const sortBy = sort || 'DESC';

    const commissions = await UserCommission.findAndCountAll({
      where: commissionQuery,
      // attributes: [
      //   'agentId',
      //   [Sequelize.fn('count', Sequelize.col('agentId')), 'cnt'],
      // ],
      // order: [[orderBy, sortBy]],
      // limit: itemPerPage,
      // offset: (pageNumber - 1) * itemPerPage,
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'userName', 'accountName'],
        },
        {
          model: Commission,
        },
        {
          model: User,
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
    return {
      commissions: commissions.rows,
      // pagination: pagination(pageNumber, itemPerPage, commissions.count),
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

exports.findOne = async (commissionQuery, whereClause) => {
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
