import * as depositeServices from '../../services/transaction/depositeServices.js';
import * as transactionServices from '../../services/transaction/transactionServices.js';

export const addDepsite = async (req, res, next) => {
  try {
    const data = req.body;
    const userId = req.user.id;

    const { message } = await depositeServices.addDeposit(userId, data);
    return res.status(201).json({ message });
  } catch (err) {
    return next(err);
  }
};

export const updateDeposite = async (req, res, next) => {
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

export const deleteDeposite = async (req, res, next) => {
  try {
    const { transactionId } = req.params;

    const { message } = await depositeServices.deleteDeposite(transactionId);
    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

export const getAllDeposites = async (req, res, next) => {
  try {
    const { page, limit, order, sort } = req.query;
    let whereClause = { type: 'ايداع' };

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
