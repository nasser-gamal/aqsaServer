const agentTreasury = require('../../dataAccess/agentTreasury/agentTreasuryRepository');
const { checkResourceExists } = require('../../utils/checkResourceExists');
const constants = require('../../utils/constants');

const isAgentTreasuryExist = async (id) => {
  const agentTreasuryExist = await agentTreasury.findById(id);
  return checkResourceExists(
    agentTreasuryExist,
    constants.AGENT_TRSEARY_NOT_FOUND
  );
};

exports.createAgentTreasury = async (userId, data) => {
  const { amount, date, note } = data;

  await agentTreasury.createOne({
    amount,
    date,
    note,
    createdBy: userId,
  });

  return { message: constants.CREATE_TREASURY_SUCCESS };
};

exports.updateAgentTreasury = async (treasuryId, data) => {
  const { amount, date, note } = data;

  await isAgentTreasuryExist(treasuryId);

  await agentTreasury.updateOne(treasuryId, {
    amount,
    date,
    note,
  });

  return { message: constants.UPDATE_TREASURY_SUCCESS };
};

exports.deleteAgentTreasury = async (treasuryId) => {
  await isAgentTreasuryExist(treasuryId);

  await agentTreasury.deleteOne(treasuryId);

  return { message: constants.DELETE_TREASURY_SUCCESS };
};

exports.findAllAgentTreasury = async (query) => {
  const { page, limit, order, sort } = query;

  const agentTreasurys = await agentTreasury.findAll(
    undefined,
    page,
    limit,
    order,
    sort
  );
  return agentTreasurys;
};
