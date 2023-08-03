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

  return { message: constants.CREATE_AGENT_TREASURY_SUCCESS };
};

exports.updateAgentTreasury = async (agentTreasuryId, data) => {
  const { amount, date, note } = data;

  await isAgentTreasuryExist(agentTreasuryId);

  await agentTreasury.updateOne(agentTreasuryId, {
    amount,
    date,
    note,
  });

  return { message: constants.UPDATE_AGENT_TREASURY_SUCCESS };
};

exports.deleteAgentTreasury = async (agentTreasuryId) => {
  await isAgentTreasuryExist(agentTreasuryId);

  await agentTreasury.deleteOne(agentTreasuryId);

  return { message: constants.DELETE_AGENT_TREASURY_SUCCESS };
};

exports.findAllAgentTreasury = async () => {
  const agentTreasurys = await agentTreasury.findAll();
  return agentTreasurys;
};
