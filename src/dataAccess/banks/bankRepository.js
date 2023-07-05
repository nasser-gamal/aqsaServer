
import BankAccount from '../../models/banks/bankAccountModel.js';
import Bank from '../../models/banks/bankModel.js';

export const createOne = async (data) => {
  try {
    const bank = await Bank.create(data);
    return bank;
  } catch (err) {
    throw new Error(err);
  }
};

export const updateOne = async (bankId, data) => {
  try {
    const bank = await Bank.update(
      {
        ...data,
      },
      { where: { id: bankId } }
    );
    return bank;
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteOne = async (bankId) => {
  try {
    const bank = await Bank.destroy({ where: { id: bankId } });
    return bank;
  } catch (err) {
    throw new Error(err);
  }
};

export const findById = async (bankId) => {
  try {
    const bank = await Bank.findByPk(bankId, {
      include: { model: BankAccount },
    });
    return bank;
  } catch (err) {
    throw new Error(err);
  }
};

export const findOne = async (query) => {
  try {
    const banks = await Bank.findOne({ where: query });
    return banks;
  } catch (err) {
    throw new Error(err);
  }
};

export const findAll = async () => {
  try {
    const banks = await Bank.findAll({ include: { model: BankAccount } });
    return banks;
  } catch (err) {
    throw new Error(err);
  }
};
