const addionalTreasuryServices = require('../../services/addionalTreasury/addionalTreasuryServices');

exports.createAddionalTreasury = async (req, res, next) => {
  try {
    const data = req.body;
    const userId = req.user.id;

    const { message } = await addionalTreasuryServices.createAddionalTreasury(
      userId,
      data
    );

    return res.status(201).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.updateAddionalTreasury = async (req, res, next) => {
  try {
    const data = req.body;
    const { treasuryId } = req.params;

    const { message } = await addionalTreasuryServices.updateAddionalTreasury(
      treasuryId,
      data
    );

    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.deleteAddionalTreasury = async (req, res, next) => {
  try {
    const { treasuryId } = req.params;

    const { message } = await addionalTreasuryServices.deleteAddionalTreasury(
      treasuryId
    );

    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.getAllAddionalTreasury = async (req, res, next) => {
  try {
    const addionalTreasurys =
      await addionalTreasuryServices.findAllAddionalTreasury();
    return res.status(200).json(addionalTreasurys);
  } catch (err) {
    return next(err);
  }
};
