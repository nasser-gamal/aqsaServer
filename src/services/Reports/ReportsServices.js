const { Op } = require('sequelize');
const transactionRepository = require('../../dataAccess/transaction/transactionRepository');
const Excel = require('exceljs');

exports.dailyReports = async (query) => {
  const { startDate, endDate, bankNumber } = query;

  const nextDay = new Date(endDate);
  nextDay.setDate(nextDay.getDate() + 1);

  const whereClause = {
    createdAt: {
      [Op.between]: [startDate, nextDay.toISOString().slice(0, 10)],
    },
  };

  const transactions = await transactionRepository.findAll(whereClause, {
    bankNumber,
  });

  return transactions;
};

// reports.services.js
exports.exportExcel = async (query) => {
  const { startDate, endDate, bankNumber } = query;

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

  console.log('----------------------------', transactions)

  const workbook = new Excel.Workbook();

  const worksheet = workbook.addWorksheet('sheet 1');

  worksheet.columns = [
    { header: 'نوع العملية', key: 'type', width: '10' },
    { header: 'تاريخ العملية', key: 'date', width: '20' },
    { header: 'رصيد قبل', key: 'balanceBefore', width: '15' },
    { header: 'رصيد بعد', key: 'balanceAfter', width: '15' },
    { header: 'القيمة', key: 'amountTotal', width: '15' },
  ];

  await transactions.map((transaction, i) => {
    return worksheet.addRows([
      {
        type: transaction.type,
        date: transaction.createdAt,
        balanceBefore: transaction.balanceBefore,
        balanceAfter: transaction.balanceAfter,
        amountTotal: transaction.amountTotal,
      },
    ]);
  });

  return workbook;
};
