const User = require('../../models/userModel');
const Provider = require('../../models/providerModel');
const { pagination } = require('../../utils/pagination');

exports.createOne = async (data) => {
  try {
    const provider = await Provider.create(data);
    return provider;
  } catch (err) {
    throw new Error(err);
  }
};

exports.updateOne = async (providerId, data) => {
  try {
    const provider = await Provider.update(
      {
        ...data,
      },
      { where: { id: providerId } }
    );
    return provider;
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteOne = async (providerId) => {
  try {
    const provider = await Provider.destroy({
      where: { id: providerId },
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

    const provider = await Provider.findAndCountAll({
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
      provider: provider.rows,
      pagination: pagination(pageNumber, itemPerPage, provider.count),
    };
  } catch (err) {
    throw new Error(err);
  }
};

exports.findById = async (providerId) => {
  try {
    const provider = await Provider.findByPk(providerId);
    return provider;
  } catch (err) {
    throw new Error(err);
  }
};

exports.findOne = async (query) => {
  try {
    const provider = await Provider.findOne({
      where: query,
    });
    return provider;
  } catch (err) {
    throw new Error(err);
  }
};
