const ReportsServices = require('../../services/Reports/ReportsServices');
const { Op } = require('sequelize');
const transactionRepository = require('../../dataAccess/transaction/transactionRepository');
const excel = require('exceljs');

exports.dailyReports = async (req, res, next) => {
  try {
    const query = req.query;

    const { transactions, totalDepoite, totalWithdraw } =
      await ReportsServices.dailyReports(query);

    return res.status(200).json({ transactions, totalDepoite, totalWithdraw });
  } catch (err) {
    next(err);
  }
};

// reports.controllers.js
exports.exportExcel = async (req, res, next) => {
  try {
    const query = req.query;

    const workbook = await ReportsServices.exportExcel(query);
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
