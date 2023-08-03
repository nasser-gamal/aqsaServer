const providerCommissionServices = require('../../services/provider/providerCommissionServices');

exports.createProviderCommission = async (req, res, next) => {
  try {
    const data = req.body;
    const userId = req.user.id;

    const { message } =
      await providerCommissionServices.createProviderCommission(userId, data);

    return res.status(201).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.updateProviderCommission = async (req, res, next) => {
  try {
    const data = req.body;
    const { providerId } = req.params;

    const { message } =
      await providerCommissionServices.updateProviderCommission(
        providerId,
        data
      );

    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.deleteProviderCommission = async (req, res, next) => {
  try {
    const { providerId } = req.params;

    const { message } =
      await providerCommissionServices.deleteProviderCommission(providerId);

    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.getAllProviderCommissions = async (req, res, next) => {
  try {
    const providerCommissions =
      await providerCommissionServices.findAllProviderCommissions();
    return res.status(200).json(providerCommissions);
  } catch (err) {
    return next(err);
  }
};
