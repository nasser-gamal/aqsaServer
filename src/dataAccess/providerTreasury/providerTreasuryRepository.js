const User = require('../../models/userModel');
const ProviderTreasury = require('../../models/providerTreasuryModel');
const { pagination } = require('../../utils/pagination');

exports.createOne = async (data) => {
  try {
    const agentTreasury = await ProviderTreasury.create(data);
    return agentTreasury;
  } catch (err) {
    throw new Error(err);
  }
};

exports.updateOne = async (providerTreasuryId, data) => {
  try {
    const agentTreasury = await ProviderTreasury.update(
      {
        ...data,
      },
      { where: { id: providerTreasuryId } }
    );
    return agentTreasury;
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteOne = async (providerTreasuryId) => {
  try {
    const provider = await ProviderTreasury.destroy({
      where: { id: providerTreasuryId },
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

    const providerTreasury = await ProviderTreasury.findAndCountAll({
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
      providerTreasury: providerTreasury.rows,
      pagination: pagination(pageNumber, itemPerPage, providerTreasury.count),
    };
  } catch (err) {
    throw new Error(err);
  }
};

exports.findById = async (providerTreasuryId) => {
  try {
    const agentTreasury = await ProviderTreasury.findByPk(providerTreasuryId);
    return agentTreasury;
  } catch (err) {
    throw new Error(err);
  }
};

exports.findOne = async (query) => {
  try {
    const agentTreasury = await ProviderTreasury.findOne({
      where: query,
    });
    return agentTreasury;
  } catch (err) {
    throw new Error(err);
  }
};
