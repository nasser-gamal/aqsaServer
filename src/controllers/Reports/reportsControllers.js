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

exports.exportExcel = async (req, res, next) => {
  try {
    const query = req.query;

    const workbook = await ReportsServices.exportExcel(query, res);

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=' + `users-${Date.now()}.xlsx`
    );

     workbook.xlsx.write(res);
    res.status(200).end();
  } catch (err) {
    next(err);
  }
};
