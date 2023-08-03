const agentTreasury = require('../../dataAccess/agentTreasury/agentTreasuryRepository');
const BadRequestError = require('../../utils/badRequestError');
const { checkResourceExists } = require('../../utils/checkResourceExists');
const constants = require('../../utils/constants');

const isAgentTreasuryExist = async (id) => {
  const agentTreasury = await agentTreasury.findById(id);
  return checkResourceExists(agentTreasury, constants.AGENT_TRSEARY_NOT_FOUND);
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

exports.updateAgentTreasury = async (providerId, data) => {
  const { amount, date, note } = data;

  await isAgentTreasuryExist(providerId);

  await agentTreasury.updateOne(providerId, {
    amount,
    date,
    note,
  });

  return { message: constants.UPDATE_AGENT_TREASURY_SUCCESS };
};

exports.deleteAgentTreasury = async (providerId) => {
  await isAgentTreasuryExist(providerId);

  await agentTreasury.deleteOne(providerId);

  return { message: constants.DELETE_AGENT_TREASURY_SUCCESS };
};

exports.findAllAgentTreasury = async () => {
  const agentTreasury = await agentTreasury.findAll();
  return  agentTreasury ;
};
