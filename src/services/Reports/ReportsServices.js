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

  // const totalDepoite = transactions.reduce((acc, transaction) => {
  //   return acc + transaction.amountTotal;
  // }, 0);

  // const totalWithdraw = transactions.reduce((acc, transaction) => {
  //   return acc + transaction.amountTotal;
  // }, 0);

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

  const totalDepoite = transactions
    .filter((transaction) => {
      return transaction.type === 'ايداع';
    })
    .reduce((acc, transaction) => {
      return acc + transaction.amountTotal;
    }, 0);

  const totalWithdraw = transactions
    .filter((transaction) => {
      return transaction.type !== 'ايداع';
    })
    .reduce((acc, transaction) => {
      return acc + transaction.amountTotal;
    }, 0);

  const workbook = new Excel.Workbook();

  const worksheet = workbook.addWorksheet('sheet 1', { rightToLeft: true });

  worksheet.columns = [
    { header: 'التاريخ', key: 'date', width: '20' },
    { header: 'رصيد قبل', key: 'balanceBefore', width: '15' },
    { header: 'ايداع', key: 'deposite', width: '15' },
    { header: 'سحب', key: 'withdraw', width: '15' },
    { header: 'ملحوظة', key: 'note', width: '80' },
    { header: 'رصيد بعد', key: 'balanceAfter', width: '15' },
    { header: 'بواسطة', key: 'creater', width: '20' },
  ];

  await transactions.map((transaction, i) => {
    return worksheet.addRows([
      {
        date: transaction.createdAt,
        balanceBefore: transaction.balanceBefore,
        deposite: transaction.type === 'ايداع' ? transaction.amountTotal : 0,
        withdraw: transaction.type === 'سحب' ? transaction.amountTotal : 0,
        note: transaction.note || '-',
        balanceAfter: transaction.balanceAfter,
        creater: transaction.creator.userName,
      },
    ]);
  });

  worksheet.addRow({
    date: 'الإجمالي',
    balanceBefore: '',
    deposite: totalDepoite.toFixed(2), // Assuming you have already calculated totalDepoite
    withdraw: totalWithdraw.toFixed(2), // Assuming you have already calculated totalWithdraw
    note: '',
    balanceAfter: '',
    creater: '',
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

  const totalRow = worksheet.lastRow;
  totalRow.eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '296f93' }, // Replace '296f93' with your desired color code for the total row
    };
  });

  return workbook;
};
