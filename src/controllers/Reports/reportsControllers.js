const ReportsServices = require('../../services/Reports/ReportsServices');
const { Op } = require('sequelize');
const transactionRepository = require('../../dataAccess/transaction/transactionRepository');
const excel = require('exceljs');

exports.dailyReports = async (req, res, next) => {
  try {
    const query = req.query;

    const transactions = await ReportsServices.dailyReports(query);

    return res.status(200).json(transactions);
  } catch (err) {
    next(err);
  }
};

// reports.controllers.js
exports.exportExcel = async (req, res, next) => {
  try {
    const { startDate, endDate, bankNumber } = req.query;

    const nextDay = new Date(endDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const whereClause = {
      createdAt: {
        [Op.between]: [startDate, nextDay.toISOString().slice(0, 10)],
      },
    };

    const { transactions } = await transactionRepository.findAll(whereClause, {
      bankNumber,
    });

    console.log('----------------------------', transactions);

    const workbook = new excel.Workbook();

    const worksheet = workbook.addWorksheet('sheet 1', { rightToLeft: true });

    worksheet.columns = [
      { header: 'التاريخ', key: 'date', width: '20' },
      { header: 'نوع العملية', key: 'type', width: '10' },
      { header: 'رصيد قبل', key: 'balanceBefore', width: '15' },
      { header: 'القيمة', key: 'amountTotal', width: '15' },
      { header: 'الرسوم', key: 'providerFees', width: '15' },
      { header: 'ملحوظة', key: 'note', width: '15' },
      { header: 'رصيد بعد', key: 'balanceAfter', width: '15' },
    ];

    await transactions.map((transaction, i) => {
      return worksheet.addRows([
        {
          date: transaction.createdAt,
          type: transaction.type,
          balanceBefore: transaction.balanceBefore,
          amountTotal: transaction.amountTotal,
          providerFees: transaction.providerFees,
          note: transaction.note || "-",
          balanceAfter: transaction.balanceAfter,
        },
      ]);
    });

    // Apply RTL text direction to each cell containing RTL text
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.alignment = {
          textRotation: 180,
          vertical: 'middle',
          horizontal: 'center',
        };
      });
    });

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
