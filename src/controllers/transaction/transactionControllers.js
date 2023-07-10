const transactionServices = require('../../services/transaction/transactionServices.js')

exports.getAllTransactions = async (req, res, next) => {
  try {
    const { page, limit, order, sort } = req.query;

    const { transactions, pagination } =
      await transactionServices.findAllTransactions(page, limit, order, sort);
    return res.status(200).json({ transactions, pagination });
  } catch (err) {
    return next(err);
  }
};

