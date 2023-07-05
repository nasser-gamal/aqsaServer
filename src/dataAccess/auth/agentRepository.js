// import Agent from '../../models/auth/agentModel.js';


// export const createAgent = async (data) => {
//   try {
//     const agent = await Agent.create(data);
//     return agent;
//   } catch (err) {
//     throw new Error(err);
//   }
// };

// export const updateAgent = async (agentId, data) => {
//   try {
//     const agent = await Agent.update(
//       {
//         data,
//       },
//       { where: { id: agentId } }
//     );
//     return agent;
//   } catch (err) {
//     throw new Error(err);
//   }
// };

// export const deleteAgent = async (agentId) => {
//   try {
//     const agent = await Agent.destroy({ where: { id: agentId } });
//     return agent;
//   } catch (err) {
//     throw new Error(err);
//   }
// };

// export const getAllAgents = async (query) => {
//   try {
//     const agents = await Agent.findAll();
//     return agents;
//   } catch (err) {
//     throw new Error(err);
//   }
// };

// export const getAgentByQuery = async (query) => {
//   try {
//     const agent = await Agent.findOne({ where: query });
//     return agent;
//   } catch (err) {
//     throw new Error(err);
//   }
// };
