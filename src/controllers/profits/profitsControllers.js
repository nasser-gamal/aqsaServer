const ProfitsServices = require('../../services/profits/ProfitsServices');

exports.getDailyProfits = async (req, res, next) => {
  try {
    const query = req.query;
    const { transactions, totalProviderCommission, totalFees, commissions } =
      await ProfitsServices.dailyProfits(query);
    return res.status(200).json({
      transactions,
      totalProviderCommission,
      totalFees,
      commissions,
    });
  } catch (err) {
    return next(err);
  }
};
