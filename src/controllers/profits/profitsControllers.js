const ProfitsServices = require('../../services/profits/ProfitsServices');

exports.getDailyProfits = async (req, res, next) => {
  try {
    const query = req.query;
    const { transactions, commissions } = await ProfitsServices.dailyProfits(
      query
    );
    return res.status(200).json({
      transactions,
      commissions,
    });
  } catch (err) {
    return next(err);
  }
};
