const BankAccount = require('../../models/banks/bankAccountModel');
const Bank = require('../../models/banks/bankModel');

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

exports.findAll = async (query) => {
  try {
    const bankAccounts = await BankAccount.findAll({
      where: query,
      attributes: { exclude: ['bankId'] },
      include: [{ model: Bank }],
    });
    return bankAccounts;
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
