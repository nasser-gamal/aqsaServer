const Treasury = require('../../models/treasury/treasuryModel.js');


exports.findOne = async () => {
  try {
    const treasury = await Treasury.findOne({});
    return treasury;
  } catch (err) {
    throw new Error(err);
  }
};

exports.updateOne = async (treasuryId) => {
  try {
    const treasury = await Treasury.update(
      {
        ...data,
      },
      { where: { id: treasuryId } }
    );

    return treasury;
  } catch (err) {
    throw new Error(err);
  }
};
