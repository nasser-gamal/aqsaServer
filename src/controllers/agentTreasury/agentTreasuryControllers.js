const agentTreasuryServices = require('../../services/agentTreasury/agentTreasuryServices');

exports.createAgentTreasury = async (req, res, next) => {
  try {
    const data = req.body;
    const userId = req.user.id;

    const { message } = await agentTreasuryServices.createAgentTreasury(
      userId,
      data
    );

    return res.status(201).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.updateAgentTreasury = async (req, res, next) => {
  try {
    const data = req.body;
    const { agentTreasuryId } = req.params;

    const { message } = await agentTreasuryServices.updateAgentTreasury(
      agentTreasuryId,
      data
    );

    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.deleteAgentTreasury = async (req, res, next) => {
  try {
    const { agentTreasuryId } = req.params;

    const { message } = await agentTreasuryServices.deleteAgentTreasury(
      agentTreasuryId
    );

    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.getAllAgentTreasury = async (req, res, next) => {
  try {
    const agentTreasury = await agentTreasuryServices.findAllAgentTreasury();
    return res.status(200).json(agentTreasury);
  } catch (err) {
    return next(err);
  }
};
