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
    const { treasuryId } = req.params;

    const { message } = await agentTreasuryServices.updateAgentTreasury(
      treasuryId,
      data
    );

    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.deleteAgentTreasury = async (req, res, next) => {
  try {
    const { treasuryId } = req.params;

    const { message } = await agentTreasuryServices.deleteAgentTreasury(
      treasuryId
    );

    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.getAllAgentTreasury = async (req, res, next) => {
  try {
    const query = req.query;

    const agentTreasurys = await agentTreasuryServices.findAllAgentTreasury(query);
    return res.status(200).json(agentTreasurys);
  } catch (err) {
    return next(err);
  }
};
