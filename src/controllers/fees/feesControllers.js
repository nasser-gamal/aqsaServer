const feesServices = require('../../services/fees/feesServices');

exports.createFee = async (req, res, next) => {
  try {
    const data = req.body;
    const userId = req.user.id;

    const { message } = await feesServices.createFees(userId, data);

    return res.status(201).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.updateFee = async (req, res, next) => {
  try {
    const data = req.body;
    const { feesId } = req.params;

    const { message } = await feesServices.updateFees(feesId, data);

    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.deleteFee = async (req, res, next) => {
  try {
    const { feesId } = req.params;

    const { message } = await feesServices.deleteFees(feesId);

    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.getAllFees = async (req, res, next) => {
  try {
    const fees = await feesServices.findAllFees();
    return res.status(200).json(fees);
  } catch (err) {
    return next(err);
  }
};
