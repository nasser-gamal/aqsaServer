const providerTreasuryServices = require('../../services/providerTreasury/providerTreasuryServices');

exports.createProviderTreasury = async (req, res, next) => {
  try {
    const data = req.body;
    const userId = req.user.id;

    const { message } = await providerTreasuryServices.createAgentTreasury(
      userId,
      data
    );

    return res.status(201).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.updateProviderTreasury = async (req, res, next) => {
  try {
    const data = req.body;
    const { providerTreasuryId } = req.params;

    const { message } = await providerTreasuryServices.updateAgentTreasury(
      providerTreasuryId,
      data
    );

    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.deleteProviderTreasury = async (req, res, next) => {
  try {
    const { providerTreasuryId } = req.params;

    const { message } = await providerTreasuryServices.deleteAgentTreasury(
      providerTreasuryId
    );

    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.getAllProviderTreasury = async (req, res, next) => {
  try {
    const providerTreasurys =
      await providerTreasuryServices.findAllAgentTreasury();
    return res.status(200).json(providerTreasurys);
  } catch (err) {
    return next(err);
  }
};
