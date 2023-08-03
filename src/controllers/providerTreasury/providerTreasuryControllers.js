const providerTreasuryServices = require('../../services/providerTreasury/providerTreasuryServices');

exports.createProviderTreasury = async (req, res, next) => {
  try {
    const data = req.body;
    const userId = req.user.id;

    const { message } = await providerTreasuryServices.createProviderTreasury(
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
    const { treasuryId } = req.params;

    const { message } = await providerTreasuryServices.updateProviderTreasury(
      treasuryId,
      data
    );

    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.deleteProviderTreasury = async (req, res, next) => {
  try {
    const { treasuryId } = req.params;

    const { message } = await providerTreasuryServices.deleteProviderTreasury(
      treasuryId
    );

    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.getAllProviderTreasury = async (req, res, next) => {
  try {
    const providerTreasurys =
      await providerTreasuryServices.findAllProviderTreasury();
    return res.status(200).json(providerTreasurys);
  } catch (err) {
    return next(err);
  }
};
