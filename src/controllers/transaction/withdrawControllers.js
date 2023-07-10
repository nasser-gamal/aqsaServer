

const transactionServices = require('../../services/transaction/transactionServices')
const withdrawServices = require('../../services/transaction/withdrawServices')


exports.addWithDraw = async (req, res, next) => {
  try {
    const data = req.body;
    const userId = req.user.id;

    const { message } = await withdrawServices.addWithDraw(userId, data);
    return res.status(201).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.updateWithDraw = async (req, res, next) => {
  try {
    const data = req.body;
    const { transactionId } = req.params;

    const { message } = await withdrawServices.updateWithDraw(
      transactionId,
      data
    );

    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
  
};


exports.deleteWithDraw = async (req, res, next) => {
  try {
    const { transactionId } = req.params;

    const { message } = await withdrawServices.deleteWithDraw(transactionId);
    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};



exports.getAllWithDraws = async (req, res, next) => {
  try {
    const { page, limit, order, sort } = req.query;
    let whereClause = { type: 'سحب' };

    const { transactions, pagination } =
      await transactionServices.findAllTransactions(
        page,
        limit,
        order,
        sort,
        whereClause
      );
    return res.status(200).json({ transactions, pagination });
  } catch (err) {
    return next(err);
  }
};
