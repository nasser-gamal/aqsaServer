const Fees = require('../../models/fees/feesModel');
const constants = require('../../utils/constants');

exports.createFee = async (req, res, next) => {
  try {
    const { amount, note } = req.body;
    const userId = req.user.id;

    await Fees.create({
      amount,
      note,
      createdBy: userId,
    });

    return res.status(201).json({ message: constants.CREATE_FEES_SUCCESS });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};
