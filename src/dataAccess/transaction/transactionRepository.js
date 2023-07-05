import Transaction from '../../models/transaction/transactionModel.js';
import User from '../../models/auth/userModel.js';
import BankAccount from '../../models/banks/bankAccountModel.js';
import Bank from '../../models/banks/bankModel.js';
import { pagination } from '../../utils/pagination.js';

export const createOne = async (data) => {
  try {
    const transaction = await Transaction.create(data);
    return transaction;
  } catch (err) {
    throw new Error(err);
  }
};

export const updateOne = async (transactionId, data) => {
  try {
    const transaction = await Transaction.update(
      {
        ...data,
      },
      { where: { id: transactionId } }
    );
    return transaction;
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteOne = async (transactionId) => {
  try {
    const transaction = await Transaction.destroy({
      where: { id: transactionId },
    });
    return transaction;
  } catch (err) {
    throw new Error(err);
  }
};

export const findAll = async (page, limit, order, sort, whereClause) => {
  try {
    const pageNumber = +page || 1;
    const itemPerPage = +limit || 2;
    const orderBy = order || 'createdAt';
    const sortBy = sort || 'DESC';

    const transactions = await Transaction.findAndCountAll({
      where: whereClause,
      order: [[orderBy, sortBy]],
      limit: itemPerPage,
      offset: (pageNumber - 1) * itemPerPage,
      include: [
        { model: User, attributes: ['userName', 'accountName'] },
        {
          model: BankAccount,
          attributes: ['accountName', 'bankNumber', 'balance'],
          include: [{ model: Bank, attributes: ['id', 'bankName'] }],
        },
      ],
    });

    return {
      transactions: transactions.rows,
      pagination: pagination(pageNumber, itemPerPage, transactions.count),
    };
  } catch (err) {
    throw new Error(err);
  }
};

export const findById = async (transactionId) => {
  try {
    const transaction = await Transaction.findByPk(transactionId, {
      include: [{ model: User }, { model: BankAccount }],
    });
    return transaction;
  } catch (err) {
    throw new Error(err);
  }
};

export const findOne = async (query) => {
  try {
    const transaction = await Transaction.findOne({
      where: query,
    });
    return transaction;
  } catch (err) {
    throw new Error(err);
  }
};
