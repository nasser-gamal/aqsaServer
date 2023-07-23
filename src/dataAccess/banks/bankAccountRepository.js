const BankAccount = require('../../models/banks/bankAccountModel');
const Bank = require('../../models/banks/bankModel');
const { pagination } = require('../../utils/pagination');

exports.createOne = async (data) => {
  try {
    const bankAccount = await BankAccount.create(data);
    return bankAccount;
  } catch (err) {
    throw new Error(err);
  }
};

exports.updateOne = async (bankAccountId, data) => {
  try {
    const bankAccount = await BankAccount.update(
      {
        ...data,
      },
      { where: { id: bankAccountId } }
    );
    return bankAccount;
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteOne = async (bankAccountId) => {
  try {
    const bankAccount = await BankAccount.destroy({
      where: { id: bankAccountId },
    });
    return bankAccount;
  } catch (err) {
    throw new Error(err);
  }
};

exports.findById = async (bankAccountId) => {
  try {
    const bankAccount = await BankAccount.findByPk(bankAccountId);
    return bankAccount;
  } catch (err) {
    throw new Error(err);
  }
};

exports.findAll = async (whereClause, page, limit, order, sort) => {
  try {
    const pageNumber = +page || 1;
    const itemPerPage = +limit || 10;
    const orderBy = order || 'createdAt';
    const sortBy = sort || 'ASC';

    const bankAccounts = await BankAccount.findAndCountAll({
      where: whereClause,
      attributes: { exclude: ['bankId'] },
      include: [{ model: Bank }],
      order: [[orderBy, sortBy]],
      limit: itemPerPage,
      offset: (pageNumber - 1) * itemPerPage,
    });
    return {
      bankAccounts: bankAccounts.rows,
      pagination: pagination(pageNumber, itemPerPage, bankAccounts.count),
    };
  } catch (err) {
    throw new Error(err);
  }
};

exports.findOne = async (query) => {
  try {
    const bankAccount = await BankAccount.findOne({
      where: query,
      attributes: { exclude: ['bankId'] },
      include: [{ model: Bank }],
    });
    return bankAccount;
  } catch (err) {
    throw new Error(err);
  }
};
