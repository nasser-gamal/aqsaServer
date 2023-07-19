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
    // const { startDate, endDate, bankNumber } = req.query;

    // const nextDay = new Date(endDate);
    // nextDay.setDate(nextDay.getDate() + 1);

    // const whereClause = {
    //   createdAt: {
    //     [Op.between]: [startDate, nextDay.toISOString().slice(0, 10)],
    //   },
    // };

    // const { transactions } = await transactionRepository.findAll(whereClause, {
    //   bankNumber,
    // });

    // console.log('----------------------------', transactions);

    // const workbook = new excel.Workbook();

    // const worksheet = workbook.addWorksheet('sheet 1');

    // worksheet.columns = [
    //   { header: 'نوع العملية', key: 'type', width: '10' },
    //   { header: 'تاريخ العملية', key: 'date', width: '20' },
    //   { header: 'رصيد قبل', key: 'balanceBefore', width: '15' },
    //   { header: 'رصيد بعد', key: 'balanceAfter', width: '15' },
    //   { header: 'القيمة', key: 'amountTotal', width: '15' },
    // ];

    // await transactions.map((transaction, i) => {
    //   return worksheet.addRows([
    //     {
    //       type: transaction.type,
    //       date: transaction.createdAt,
    //       balanceBefore: transaction.balanceBefore,
    //       balanceAfter: transaction.balanceAfter,
    //       amountTotal: transaction.amountTotal,
    //     },
    //   ]);
    // });

    // res.setHeader(
    //   'Content-Type',
    //   'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    // );
    // res.setHeader(
    //   'Content-Disposition',
    //   'attachment; filename=' + `users-${Date.now()}.xlsx`
    // );

    // return workbook.xlsx.write(res).then(() => {
    //   res.status(200).end();
    // });
    // Fetch your data from the database or any other source
    const data = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    ];

    // Create an Excel workbook and worksheet
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('sheet 1');

    // Add headers to the worksheet
    worksheet.columns = [
      { header: 'id', key: 'id', width: '10' },
      { header: 'Name', key: 'Name', width: '10' },
      { header: 'Email', key: 'Email', width: '10' },
    ];
    // Add data rows to the worksheet
    data.forEach((item) => {
      worksheet.addRow([{ id: item.id, Name: item.name, Email: item.email }]);
    });

    // Set the response headers for the Excel file
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');

    // Generate the Excel file and send it as a response
    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    next(err);
  }
};
