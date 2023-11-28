const User = require('../../models/userModel');
const AgentTreasury = require('../../models/agentTreasuryModel');
const { pagination } = require('../../utils/pagination');

exports.createOne = async (data) => {
  try {
    const agentTreasury = await AgentTreasury.create(data);
    return agentTreasury;
  } catch (err) {
    throw new Error(err);
  }
};

exports.updateOne = async (agentTreasuryId, data) => {
  try {
    const agentTreasury = await AgentTreasury.update(
      {
        ...data,
      },
      { where: { id: agentTreasuryId } }
    );
    return agentTreasury;
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteOne = async (agentTreasuryId) => {
  try {
    const provider = await AgentTreasury.destroy({
      where: { id: agentTreasuryId },
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

    const agentTreasury = await AgentTreasury.findAndCountAll({
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
      agentTreasury: agentTreasury.rows,
      pagination: pagination(pageNumber, itemPerPage, agentTreasury.count),
    };
  } catch (err) {
    throw new Error(err);
  }
};

exports.findById = async (agentTreasuryId) => {
  try {
    const agentTreasury = await AgentTreasury.findByPk(agentTreasuryId);
    return agentTreasury;
  } catch (err) {
    throw new Error(err);
  }
};

exports.findOne = async (query) => {
  try {
    const agentTreasury = await AgentTreasury.findOne({
      where: query,
    });
    return agentTreasury;
  } catch (err) {
    throw new Error(err);
  }
};
