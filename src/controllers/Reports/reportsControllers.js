const reportsServices = require('../../services/reports/ReportsServices');

exports.userReports = async (req, res, next) => {
  try {
    const query = req.query;

    const { transactions, totalDepoite, totalWithdraw, totalProfit } =
      await reportsServices.userReports(query);

    return res
      .status(200)
      .json({ transactions, totalDepoite, totalWithdraw, totalProfit });
  } catch (err) {
    next(err);
  }
};

exports.dailyReports = async (req, res, next) => {
  try {
    const query = req.query;

    const { transactions, totalDepoite, totalWithdraw, totalProfit } =
      await reportsServices.dailyReports(query);

    return res
      .status(200)
      .json({ transactions, totalDepoite, totalWithdraw, totalProfit });
  } catch (err) {
    next(err);
  }
};

exports.employReports = async (req, res, next) => {
  try {
    const query = req.query;

    const { transactions, totalDepoite, totalWithdraw, totalProfit } =
      await reportsServices.employReports(query);

    return res
      .status(200)
      .json({ transactions, totalDepoite, totalWithdraw, totalProfit });
  } catch (err) {
    next(err);
  }
};

// reports.controllers.js
exports.exportExcel = async (req, res, next) => {
  try {
    const query = req.query;

    const workbook = await reportsServices.exportExcel(query);
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=' + `users-${Date.now()}.xlsx`
    );

    return workbook.xlsx.write(res).then(() => {
      res.status(200).end();
    });
  } catch (err) {
    next(err);
  }
};
