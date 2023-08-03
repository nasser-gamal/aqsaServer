const User = require('../../models/auth/userModel');
const ProviderCommission = require('../../models/provider/providerCommission');
const Provider = require('../../models/provider/providerModel');
const { pagination } = require('../../utils/pagination');

exports.createOne = async (data) => {
  try {
    const providerCommission = await ProviderCommission.create(data);
    return providerCommission;
  } catch (err) {
    throw new Error(err);
  }
};

exports.updateOne = async (providerId, data) => {
  try {
    const providerCommission = await ProviderCommission.update(
      {
        ...data,
      },
      { where: { id: providerId } }
    );
    return providerCommission;
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteOne = async (providerId) => {
  try {
    const providerCommission = await ProviderCommission.destroy({
      where: { id: providerId },
    });
    return providerCommission;
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

    const providerCommissions = await ProviderCommission.findAndCountAll({
      where: whereClause,
      ...options,
      order: [[orderBy, sortBy]],
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'userName', 'accountName'],
        },
        {
          model: Provider,
          as: 'provider',
        },
      ],
    });

    return {
      providerCommissions: providerCommissions.rows,
      pagination: pagination(
        pageNumber,
        itemPerPage,
        providerCommissions.count
      ),
    };
  } catch (err) {
    throw new Error(err);
  }
};

exports.findById = async (providerId) => {
  try {
    const providerCommission = await ProviderCommission.findByPk(providerId);
    return providerCommission;
  } catch (err) {
    throw new Error(err);
  }
};

exports.findOne = async (query) => {
  try {
    const providerCommission = await ProviderCommission.findOne({
      where: query,
    });
    return providerCommission;
  } catch (err) {
    throw new Error(err);
  }
};
