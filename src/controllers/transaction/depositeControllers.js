
const depositeServices = require('../../services/transaction/depositeServices')
const transactionServices = require('../../services/transaction/transactionServices')

exports.addDepsite = async (req, res, next) => {
  try {
    const data = req.body;
    const userId = req.user.id;

    const { message } = await depositeServices.addDeposit(userId, data);
    return res.status(201).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.updateDeposite = async (req, res, next) => {
  try {
    const data = req.body;
    const { transactionId } = req.params;

    const { message } = await depositeServices.updateDeposite(
      transactionId,
      data
    );

    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.deleteDeposite = async (req, res, next) => {
  try {
    const { transactionId } = req.params;

    const { message } = await depositeServices.deleteDeposite(transactionId);
    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.getAllDeposites = async (req, res, next) => {
  try {
    const { page, limit, order, sort } = req.query;
    let whereClause = { type: 'ايداع' };

    const { transactions, pagination } =
      await transactionServices.findAllTransactions(
        whereClause,
        page,
        limit,
        order,
        sort,
      );
    return res.status(200).json({ transactions, pagination });
  } catch (err) {
    return next(err);
  }
};
