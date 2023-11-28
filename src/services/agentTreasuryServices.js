const asyncHandler = require('express-async-handler');
const constants = require('../utils/constants');
const AgentTreasury = require('../models/agentTreasuryModel');
const {
  createDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
} = require('./factory');


exports.createAgentTreasury = asyncHandler(async (data) => {
  await createDoc(AgentTreasury, data);
  return { message: constants.CREATE_SUCCESS };
});

exports.getAgentTreasuries = asyncHandler(async (query, filterObj) =>
  getDocs(AgentTreasury, query, filterObj)
);

exports.getAgentTreasury = asyncHandler(async (treasuryId) =>
  getDoc(AgentTreasury, treasuryId)
);

exports.updateAgentTreasury = asyncHandler(async (treasuryId, data) => {
  await updateDoc(AgentTreasury, treasuryId, data);
  return { message: constants.UPDATE_SUCCESS };
});

exports.deleteAgentTreasury = asyncHandler(async (treasuryId) => {
    await updateDoc(AgentTreasury, treasuryId, { isDeleted: true });
  return { message: constants.DELETE_SUCCESS };
});
