const BankAccount = require('../../models/banks/bankAccountModel');
const Bank = require('../../models/banks/bankModel');

exports.createOne = async (data) => {
  try {
    const bank = await Bank.create(data);
    return bank;
  } catch (err) {
    throw new Error(err);
  }
};

exports.updateOne = async (bankId, data) => {
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

exports.deleteOne = async (bankId) => {
  try {
    const bank = await Bank.destroy({ where: { id: bankId } });
    return bank;
  } catch (err) {
    throw new Error(err);
  }
};

exports.findById = async (bankId) => {
  try {
    const bank = await Bank.findByPk(bankId, {
      include: { model: BankAccount },
    });
    return bank;
  } catch (err) {
    throw new Error(err);
  }
};

exports.findOne = async (query) => {
  try {
    const banks = await Bank.findOne({ where: query });
    return banks;
  } catch (err) {
    throw new Error(err);
  }
};

exports.findAll = async () => {
  try {
    const banks = await Bank.findAll({ include: { model: BankAccount } });
    return banks;
  } catch (err) {
    throw new Error(err);
  }
};
