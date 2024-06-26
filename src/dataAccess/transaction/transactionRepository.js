const Transaction = require('../../models/transaction/transactionModel.js');
const User = require('../../models/userModel');
const BankAccount = require('../../models/bankAccountModel');
const Bank = require('../../models/bankModel');
const { pagination } = require('../../utils/pagination.js');
const ApiFeature = require('../../utils/ApiFeature.js');

exports.createOne = async (data) => {
  try {
    const transaction = await Transaction.create(data);
    return transaction;
  } catch (err) {
    throw new Error(err);
  }
};

exports.updateOne = async (transactionId, data) => {
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

exports.deleteOne = async (transactionId) => {
  try {
    const transaction = await Transaction.destroy({
      where: { id: transactionId },
    });
    return transaction;
  } catch (err) {
    throw new Error(err);
  }
};


exports.findAll = async (
  whereClause,
  accountsClause,
  page,
  limit,
  order,
  sort,
  userClause
) => {
  try {
    const pageNumber = +page || 1;
    const itemPerPage = +limit || 10;
    const orderBy = order || 'createdAt';
    const sortBy = sort || 'ASC';

    let options;
    if (page && limit) {
      options = {
        limit: itemPerPage,
        offset: (pageNumber - 1) * itemPerPage,
      };
    }

    const transactions = await Transaction.findAndCountAll({
      where: whereClause,
      order: [[orderBy, sortBy]],
      ...options,
      include: [
        {
          model: User,
          as: 'creator',
          where: userClause,
          attributes: ['userName', 'accountName'],
        },
        {
          model: BankAccount,
          where: accountsClause,
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


exports.findById = async (transactionId) => {
  try {
    const transaction = await Transaction.findByPk(transactionId, {
      include: [{ model: User }, { model: BankAccount }],
    });
    return transaction;
  } catch (err) {
    throw new Error(err);
  }
};

exports.findOne = async (query) => {
  try {
    const transaction = await Transaction.findOne({
      where: query,
    });
    return transaction;
  } catch (err) {
    throw new Error(err);
  }
};
