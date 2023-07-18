const ReportsServices = require('../../services/Reports/ReportsServices');

exports.dailyReports = async (req, res, next) => {
  try {
    const query = req.query;

    const transactions = await ReportsServices.dailyReports(query);

    return res.status(200).json(transactions);
  } catch (err) {
    next(err);
  }
};
