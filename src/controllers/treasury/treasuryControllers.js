const treasuryServcies = require('../../services/treasury/treasuryServcies');

exports.findTreasury = async (req, res, next) => {
  try {
    const treasury = await treasuryServcies.getTreasury();
    return res.status(200).json(treasury);
  } catch (err) {
    next(err);
  }
};
