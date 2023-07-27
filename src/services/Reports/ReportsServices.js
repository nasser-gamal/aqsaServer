const { Op } = require('sequelize');
const Excel = require('exceljs');
const feesRepository = require('../../dataAccess/fees/feesRepository');
const transactionRepository = require('../../dataAccess/transaction/transactionRepository');
const transferRepository = require('../../dataAccess/transaction/transferRepository');
const UserCommission = require('../../dataAccess/commission/userCommission.repository');

exports.bankAccountReports = async (query) => {
  const { startDate, endDate, bankAccountId, page, limit, order, sort } = query;

  const nextDay = new Date(endDate);
  nextDay.setDate(nextDay.getDate() + 1);

  const whereClause = {
    date: {
      [Op.between]: [startDate, nextDay.toISOString().slice(0, 10)],
    },
  };

  const transactions = await transactionRepository.findAll(
    whereClause,
    {
      id: bankAccountId,
    },
    page,
    limit,
    order,
    sort
  );

  const totalDepoite = transactions.transactions
    .filter((transaction) => {
      return transaction.type === 'ايداع';
    })
    .reduce((acc, transaction) => {
      return acc + transaction.amountTotal;
    }, 0)
    .toFixed(2);

  const totalWithdraw = transactions.transactions
    .filter((transaction) => {
      return transaction.type === 'سحب';
    })
    .reduce((acc, transaction) => {
      return (transaction.balanceBefore - transaction.balanceAfter).toFixed(
        2
      ) == transaction.amountTotal.toFixed(2)
        ? acc + transaction.amountTotal
        : acc + transaction.providerDeduction;
    }, 0)
    .toFixed(2);

  const totalProfit = transactions.transactions
    .reduce((acc, transaction) => {
      return acc + transaction.profit;
    }, 0)
    .toFixed(2);

  return { transactions, totalDepoite, totalWithdraw, totalProfit };
};

exports.exportBankAccountReports = async (query) => {
  const { startDate, endDate, bankAccountId } = query;

  const nextDay = new Date(endDate);
  nextDay.setDate(nextDay.getDate() + 1);

  const whereClause = {
    createdAt: {
      [Op.between]: [startDate, nextDay.toISOString().slice(0, 10)],
    },
  };

  const { transactions } = await transactionRepository.findAll(whereClause, {
    id: bankAccountId,
  });

  const totalDepoite = transactions
    .filter((transaction) => {
      return transaction.type === 'ايداع';
    })
    .reduce((acc, transaction) => {
      return acc + transaction.amountTotal;
    }, 0);

  const totalWithdraw = transactions.transactions
    .filter((transaction) => {
      return transaction.type === 'سحب';
    })
    .reduce((acc, transaction) => {
      return (transaction.balanceBefore - transaction.balanceAfter).toFixed(
        2
      ) == transaction.amountTotal.toFixed(2)
        ? acc + transaction.amountTotal
        : acc + transaction.providerDeduction;
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
    deposite: totalDepoite.toFixed(2),
    withdraw: totalWithdraw.toFixed(2),
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

  worksheet.rowCount = transactions.length + 1; // Adding 1 for the total row

  return workbook;
};

exports.dailyReports = async (query) => {
  const { startDate, endDate, page, limit, order, sort } = query;

  const nextDay = new Date(endDate);
  nextDay.setDate(nextDay.getDate() + 1);

  const whereClause = {
    createdAt: {
      [Op.between]: [startDate, nextDay.toISOString().slice(0, 10)],
    },
  };

  const transactions = await transactionRepository.findAll(
    whereClause,
    undefined,
    page,
    limit,
    order,
    sort
  );

  const totalDepoite = transactions.transactions
    .filter((transaction) => {
      return transaction.type === 'ايداع';
    })
    .reduce((acc, transaction) => {
      return acc + transaction.amountTotal;
    }, 0)
    .toFixed(2);

  const totalWithdraw = transactions.transactions
    .filter((transaction) => {
      return transaction.type === 'سحب';
    })
    .reduce((acc, transaction) => {
      return (transaction.balanceBefore - transaction.balanceAfter).toFixed(
        2
      ) == transaction.amountTotal.toFixed(2)
        ? acc + transaction.amountTotal
        : acc + transaction.providerDeduction;
    }, 0)
    .toFixed(2);

  const totalProfit = transactions.transactions
    .reduce((acc, transaction) => {
      return acc + transaction.profit;
    }, 0)
    .toFixed(2);

  return { transactions, totalDepoite, totalWithdraw, totalProfit };
};

exports.exportDayReportExcel = async (query) => {
  const { startDate, endDate } = query;

  const nextDay = new Date(endDate);
  nextDay.setDate(nextDay.getDate() + 1);

  const whereClause = {
    createdAt: {
      [Op.between]: [startDate, nextDay.toISOString().slice(0, 10)],
    },
  };

  const transactions = await transactionRepository.findAll(whereClause);

  const totalDepoite = transactions.transactions
    .filter((transaction) => {
      return transaction.type === 'ايداع';
    })
    .reduce((acc, transaction) => {
      return acc + transaction.amountTotal;
    }, 0);

  const totalWithdraw = transactions.transactions
    .filter((transaction) => {
      return transaction.type === 'سحب';
    })
    .reduce((acc, transaction) => {
      return (transaction.balanceBefore - transaction.balanceAfter).toFixed(
        2
      ) == transaction.amountTotal.toFixed(2)
        ? acc + transaction.amountTotal
        : acc + transaction.providerDeduction;
    }, 0);

  const workbook = new Excel.Workbook();

  const worksheet = workbook.addWorksheet('sheet 1', { rightToLeft: true });

  worksheet.columns = [
    { header: 'التاريخ', key: 'date', width: '20' },
    { header: 'الحساب', key: 'bankAccount', width: '20' },
    { header: 'الرقم', key: 'number', width: '20' },
    { header: 'رصيد قبل', key: 'balanceBefore', width: '15' },
    { header: 'ايداع', key: 'deposite', width: '15' },
    { header: 'سحب', key: 'withdraw', width: '15' },
    { header: 'القيمة', key: 'amount', width: '15' },
    { header: 'رسوم المزود', key: 'providerFees', width: '15' },
    { header: 'الاجمالي', key: 'amountTotal', width: '15' },
    { header: 'رصيد بعد', key: 'balanceAfter', width: '15' },
    { header: 'ملحوظة', key: 'note', width: '80' },
    { header: 'عائد مزود الخدمة', key: 'providerRevenue', width: '15' },
    { header: 'الربح', key: 'profit', width: '15' },
    { header: 'بواسطة', key: 'creater', width: '20' },
  ];

  await transactions.transactions.map((transaction, i) => {
    return worksheet.addRows([
      {
        date: transaction.createdAt,
        balanceBefore: transaction.balanceBefore,
        bankAccount: transaction.bankAccount.accountName,
        number: transaction.number,
        deposite: transaction.type === 'ايداع' ? transaction.amountTotal : 0,
        withdraw: transaction.type === 'سحب' ? transaction.amountTotal : 0,
        amount: transaction.amount,
        providerFees: transaction.providerFees,
        amountTotal: transaction.amountTotal,
        balanceAfter: transaction.balanceAfter,
        note: transaction.note || '-',
        providerRevenue: transaction.providerRevenue,
        profit: transaction.profit,
        creater: transaction.creator.userName,
      },
    ]);
  });

  worksheet.addRow({
    date: 'الإجمالي',
    balanceBefore: '',
    balanceBefore: '',
    bankAccount: '',
    number: '',
    deposite: totalDepoite.toFixed(2),
    withdraw: totalWithdraw.toFixed(2),
    amount: '',
    providerFees: '',
    amountTotal: '',
    balanceAfter: '',
    note: '',
    providerRevenue: '',
    profit: '',
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

  worksheet.rowCount = transactions.length + 1; // Adding 1 for the total row

  return workbook;
};

exports.employReports = async (query) => {
  const { startDate, endDate, userId, page, limit, order, sort } = query;

  const nextDay = new Date(endDate);
  nextDay.setDate(nextDay.getDate() + 1);

  const whereClause = {
    createdAt: {
      [Op.between]: [startDate, nextDay.toISOString().slice(0, 10)],
    },
  };

  const userClause = {
    id: userId,
  };

  const transactions = await transactionRepository.findAll(
    whereClause,
    undefined,
    page,
    limit,
    order,
    sort,
    userClause
  );

  const totalDepoite = transactions.transactions
    .filter((transaction) => {
      return transaction.type === 'ايداع';
    })
    .reduce((acc, transaction) => {
      return acc + transaction.amountTotal;
    }, 0)
    .toFixed(2);

  const totalWithdraw = transactions.transactions
    .filter((transaction) => {
      return transaction.type === 'سحب';
    })
    .reduce((acc, transaction) => {
      return (transaction.balanceBefore - transaction.balanceAfter).toFixed(
        2
      ) == transaction.amountTotal.toFixed(2)
        ? acc + transaction.amountTotal
        : acc + transaction.providerDeduction;
    }, 0)
    .toFixed(2);

  const totalProfit = transactions.transactions
    .reduce((acc, transaction) => {
      return acc + transaction.profit;
    }, 0)
    .toFixed(2);

  return { transactions, totalDepoite, totalWithdraw, totalProfit };
};

exports.exportEmployReportExcel = async (query) => {
  const { startDate, endDate, userId } = query;

  const nextDay = new Date(endDate);
  nextDay.setDate(nextDay.getDate() + 1);

  const whereClause = {
    createdAt: {
      [Op.between]: [startDate, nextDay.toISOString().slice(0, 10)],
    },
  };

  const userClause = {
    id: userId,
  };

  const transactions = await transactionRepository.findAll(
    whereClause,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    userClause
  );

  const totalDepoite = transactions.transactions
    .filter((transaction) => {
      return transaction.type === 'ايداع';
    })
    .reduce((acc, transaction) => {
      return acc + transaction.amountTotal;
    }, 0);

  const totalWithdraw = transactions.transactions
    .filter((transaction) => {
      return transaction.type === 'سحب';
    })
    .reduce((acc, transaction) => {
      return (transaction.balanceBefore - transaction.balanceAfter).toFixed(
        2
      ) == transaction.amountTotal.toFixed(2)
        ? acc + transaction.amountTotal
        : acc + transaction.providerDeduction;
    }, 0);

  const workbook = new Excel.Workbook();

  const worksheet = workbook.addWorksheet('sheet 1', { rightToLeft: true });

  worksheet.columns = [
    { header: 'التاريخ', key: 'date', width: '20' },
    { header: 'الحساب', key: 'bankAccount', width: '20' },
    { header: 'الرقم', key: 'number', width: '20' },
    { header: 'رصيد قبل', key: 'balanceBefore', width: '15' },
    { header: 'ايداع', key: 'deposite', width: '15' },
    { header: 'سحب', key: 'withdraw', width: '15' },
    { header: 'القيمة', key: 'amount', width: '15' },
    { header: 'رسوم المزود', key: 'providerFees', width: '15' },
    { header: 'الاجمالي', key: 'amountTotal', width: '15' },
    { header: 'رصيد بعد', key: 'balanceAfter', width: '15' },
    { header: 'ملحوظة', key: 'note', width: '80' },
    { header: 'عائد مزود الخدمة', key: 'providerRevenue', width: '15' },
    { header: 'الربح', key: 'profit', width: '15' },
  ];

  await transactions.transactions.map((transaction, i) => {
    return worksheet.addRows([
      {
        date: transaction.createdAt,
        balanceBefore: transaction.balanceBefore,
        bankAccount: transaction.bankAccount.accountName,
        number: transaction.number,
        deposite: transaction.type === 'ايداع' ? transaction.amountTotal : 0,
        withdraw: transaction.type === 'سحب' ? transaction.amountTotal : 0,
        amount: transaction.amount,
        providerFees: transaction.providerFees,
        amountTotal: transaction.amountTotal,
        balanceAfter: transaction.balanceAfter,
        note: transaction.note || '-',
        providerRevenue: transaction.providerRevenue,
        profit: transaction.profit,
      },
    ]);
  });

  worksheet.addRow({
    date: 'الإجمالي',
    balanceBefore: '',
    balanceBefore: '',
    bankAccount: '',
    number: '',
    deposite: totalDepoite.toFixed(2),
    withdraw: totalWithdraw.toFixed(2),
    amount: '',
    providerFees: '',
    amountTotal: '',
    balanceAfter: '',
    note: '',
    providerRevenue: '',
    profit: '',
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

  worksheet.rowCount = transactions.length + 1; // Adding 1 for the total row

  return workbook;
};

exports.transferReport = async (query) => {
  const { startDate, endDate, page, limit, order, sort } = query;

  const nextDay = new Date(endDate);
  nextDay.setDate(nextDay.getDate() + 1);

  const whereClause = {
    createdAt: {
      [Op.between]: [startDate, nextDay.toISOString().slice(0, 10)],
    },
  };

  const transfer = await transferRepository.findAll(
    whereClause,
    page,
    limit,
    order,
    sort
  );

  return transfer;
};

exports.exportTransferReportExcel = async (query) => {
  const { startDate, endDate } = query;

  const nextDay = new Date(endDate);
  nextDay.setDate(nextDay.getDate() + 1);

  const whereClause = {
    createdAt: {
      [Op.between]: [startDate, nextDay.toISOString().slice(0, 10)],
    },
  };

  const { transfers } = await transferRepository.findAll(whereClause);

  const workbook = new Excel.Workbook();

  const worksheet = workbook.addWorksheet('sheet 1', { rightToLeft: true });

  worksheet.columns = [
    { header: 'التاريخ', key: 'date', width: '20' },
    { header: 'القيمة', key: 'amountTotal', width: '15' },
    { header: 'المحول منه', key: 'sender', width: '20' },
    { header: 'رصيد قبل', key: 'senderBalanceBefore', width: '15' },
    { header: 'رصيد بعد', key: 'senderBalanceAfter', width: '15' },
    { header: 'المحول إليه', key: 'recipient', width: '15' },
    { header: 'رصيد قبل', key: 'recipientBalanceBefore', width: '15' },
    { header: 'رصيد بعد', key: 'recipientBalanceAfter', width: '15' },
    { header: 'ملحوظة', key: 'note', width: '80' },
  ];

  await transfers.map((transfer, i) => {
    return worksheet.addRows([
      {
        date: transfer.createdAt,
        amountTotal: transfer.amountTotal,
        sender: transfer.sender.accountName,
        senderBalanceBefore: transfer.balanceSenderBefore,
        senderBalanceAfter: transfer.balanceSenderAfter,
        recipient: transfer.recipient.accountName,
        recipientBalanceBefore: transfer.balanceRecipientBefore,
        recipientBalanceAfter: transfer.balanceRecipientAfter,
        note: transfer.note || '-',
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

  worksheet.rowCount = transfers.length + 1; // Adding 1 for the total row

  return workbook;
};

exports.feesReports = async (query) => {
  const { startDate, endDate, page, limit, order, sort } = query;

  const nextDay = new Date(endDate);
  nextDay.setDate(nextDay.getDate() + 1);

  const whereClause = {
    createdAt: {
      [Op.between]: [startDate, nextDay.toISOString().slice(0, 10)],
    },
  };

  const fees = await feesRepository.findAll(
    whereClause,
    page,
    limit,
    order,
    sort
  );

  const totalFees = fees.fees
    .reduce((acc, fee) => {
      return acc + fee.amount;
    }, 0)
    .toFixed(2);

  return { fees, totalFees };
};
exports.userCommissionReports = async (query) => {
  const { startDate, endDate, page, limit, order, sort } = query;

  const dateFrom = new Date(startDate);
  const dateTo = new Date(endDate);

  const monthFrom = dateFrom.getMonth() + 1;
  const monthTo = dateTo.getMonth() + 1;
  const yearFrom = dateFrom.getFullYear();
  const yearTo = dateTo.getFullYear();

  const { commissions } = await UserCommission.findAll({
    [Op.or]: [
      {
        year: yearFrom,
        [Op.and]: [
          { month: { [Op.gte]: monthFrom } },
          { month: { [Op.lte]: monthTo } },
        ],
      },
      {
        year: yearTo,
        [Op.and]: [
          { month: { [Op.gte]: monthFrom } },
          { month: { [Op.lte]: monthTo } },
        ],
      },
    ],
  });

  const agentReports = {};

  // Iterate through each user commission record
  commissions.forEach((userCommission) => {
    const { agentId, commissions, agent, ...rest } = userCommission.toJSON({
      include: 'agent',
    });

    if (!agentReports[agentId]) {
      agentReports[agentId] = {
        agentId,
        agent: agent,
        commissions: commissions.reduce(
          (total, commission) => total + commission.commission,
          0
        ),
      };
    } else {
      agentReports[agentId].commissions += commissions.reduce(
        (total, commission) => total + commission.commission,
        0
      );
    }
  });

  // Convert the agentReports object into an array of objects
  const groupedCommissions = Object.values(agentReports);

  const totalCommission = groupedCommissions
    .reduce((acc, commission) => {
      return acc + commission.commissions;
    }, 0)
    .toFixed(2);

  return { groupedCommissions, totalCommission };
};
