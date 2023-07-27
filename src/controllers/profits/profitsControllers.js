const ProfitsServices = require('../../services/profits/ProfitsServices');

exports.getDailyProfits = async (req, res, next) => {
  try {
    const query = req.query;
    const {
      totalDepoite,
      totalWithdraw,
      totalDepoiteCount,
      totalWithdrawCount,
      totalProfits,
    } = await ProfitsServices.dailyProfits(query);
    return res.status(200).json({
      totalDepoite,
      totalWithdraw,
      totalDepoiteCount,
      totalWithdrawCount,
      totalProfits,
    });
  } catch (err) {
    return next(err);
  }
};
