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

  console.log('----------------------------', transactions);

  const workbook = new Excel.Workbook();

  const worksheet = workbook.addWorksheet('sheet 1', { rightToLeft: true });

  worksheet.columns = [
    { header: 'التاريخ', key: 'date', width: '20' },
    { header: 'نوع العملية', key: 'type', width: '15' },
    { header: 'رصيد قبل', key: 'balanceBefore', width: '15' },
    { header: 'اجمالي القيمة', key: 'amountTotal', width: '15' },
    // { header: 'الرسوم', key: 'providerFees', width: '15' },
    { header: 'ملحوظة', key: 'note', width: '80' },
    { header: 'رصيد بعد', key: 'balanceAfter', width: '15' },
  ];

  await transactions.map((transaction, i) => {
    return worksheet.addRows([
      {
        date: transaction.createdAt,
        type: transaction.type,
        balanceBefore: transaction.balanceBefore,
        amountTotal: transaction.amountTotal,
        // providerFees: transaction.providerFees,
        note: transaction.note || '-',
        balanceAfter: transaction.balanceAfter,
      },
    ]);
  });

  worksheet.eachRow((row) => {
    row.eachCell((cell) => {
      cell.font = { bold: true };
      cell.alignment = {
        textRotation: 180,
        vertical: 'middle',
        horizontal: 'center',
      };
    });
  });

  const headerRow = worksheet.getRow(1);
  headerRow.eachCell((cell) => {
    cell.font = { bold: true, size: 14, color: { argb: '000000' } };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '296f93' }, // Replace 'FFFF0000' with your desired color code
    };
  });

  return workbook;
};
