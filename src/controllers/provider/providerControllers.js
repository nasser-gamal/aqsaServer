const providerServices = require('../../services/provider/providerServices');

exports.createProvider = async (req, res, next) => {
  try {
    const data = req.body;
    const userId = req.user.id;

    const { message } = await providerServices.createProvider(userId, data);

    return res.status(201).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.updateProvider = async (req, res, next) => {
  try {
    const data = req.body;
    const { providerId } = req.params;

    const { message } = await providerServices.updateProvider(providerId, data);

    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.deleteProvider = async (req, res, next) => {
  try {
    const { providerId } = req.params;

    const { message } = await providerServices.deleteProvider(providerId);

    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.getAllProviderss = async (req, res, next) => {
  try {
    const query = req.query;
    const providers = await providerServices.findAllProvider(query);
    return res.status(200).json(providers);
  } catch (err) {
    return next(err);
  }
};
