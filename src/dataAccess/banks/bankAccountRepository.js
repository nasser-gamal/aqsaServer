import BankAccount from '../../models/banks/bankAccountModel.js';
import Bank from '../../models/banks/bankModel.js';

export const createOne = async (data) => {
  try {
    const bankAccount = await BankAccount.create(data);
    return bankAccount;
  } catch (err) {
    throw new Error(err);
  }
};

export const updateOne = async (bankAccountId, data) => {
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

export const deleteOne = async (bankAccountId) => {
  try {
    const bankAccount = await BankAccount.destroy({
      where: { id: bankAccountId },
    });
    return bankAccount;
  } catch (err) {
    throw new Error(err);
  }
};

export const findById = async (bankAccountId) => {
  try {
    const bankAccount = await BankAccount.findByPk(bankAccountId);
    return bankAccount;
  } catch (err) {
    throw new Error(err);
  }
};

export const findAll = async (query) => {
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

export const findOne = async (query) => {
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
