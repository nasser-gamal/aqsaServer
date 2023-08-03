const User = require('../../models/auth/userModel');
const AddionalTreasury = require('../../models/addionalTreasuy/addionalTreasuryModel');
const { pagination } = require('../../utils/pagination');

exports.createOne = async (data) => {
  try {
    const addionalTreasury = await AddionalTreasury.create(data);
    return addionalTreasury;
  } catch (err) {
    throw new Error(err);
  }
};

exports.updateOne = async (addionalTreasuryId, data) => {
  try {
    const addionalTreasury = await AddionalTreasury.update(
      {
        ...data,
      },
      { where: { id: addionalTreasuryId } }
    );
    return addionalTreasury;
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteOne = async (addionalTreasuryId) => {
  try {
    const provider = await AddionalTreasury.destroy({
      where: { id: addionalTreasuryId },
    });
    return provider;
  } catch (err) {
    throw new Error(err);
  }
};

exports.findAll = async (whereClause, page, limit, order, sort) => {
  try {
    const pageNumber = +page || 1;
    const itemPerPage = +limit;
    const orderBy = order || 'createdAt';
    const sortBy = sort || 'ASC';

    let options;
    if (page && limit) {
      options = { limit: itemPerPage, offset: (pageNumber - 1) * itemPerPage };
    }

    const addionalTreasury = await AddionalTreasury.findAndCountAll({
      where: whereClause,
      ...options,
      order: [[orderBy, sortBy]],
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'userName', 'accountName'],
        },
      ],
    });

    return {
      addionalTreasury: addionalTreasury.rows,
      pagination: pagination(pageNumber, itemPerPage, addionalTreasury.count),
    };
  } catch (err) {
    throw new Error(err);
  }
};

exports.findById = async (addionalTreasuryId) => {
  try {
    const addionalTreasury = await AddionalTreasury.findByPk(addionalTreasuryId);
    return addionalTreasury;
  } catch (err) {
    throw new Error(err);
  }
};

exports.findOne = async (query) => {
  try {
    const addionalTreasury = await AddionalTreasury.findOne({
      where: query,
    });
    return addionalTreasury;
  } catch (err) {
    throw new Error(err);
  }
};
