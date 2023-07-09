const bankAccountServices = require('../../services/banks/bankAccountServices');


exports.createBankAccount = async (req, res, next) => {
  try {
    const data = req.body;

    const { message } = await bankAccountServices.createBankAccount(data);

    return res.status(201).send({ message });
  } catch (err) {
    return next(err);
  }
};

exports.updateBankAccount = async (req, res, next) => {
  try {
    const { bankAccountId } = req.params;
    const data = req.body;

    const { message } = await bankAccountServices.updateBankAccount(bankAccountId, {
      ...data,
    });

    return res.status(201).send({ message });
  } catch (err) {
    return next(err);
  }
};

exports.deleteBankAccount = async (req, res, next) => {
  try {
    const { bankAccountId } = req.params;

    const { message } = await bankAccountServices.deleteBankAccount(bankAccountId);
    return res.status(201).send({ message });
  } catch (err) {
    return next(err);
  }
};

exports.getAllBankAccounts = async (req, res, next) => {
  try {
    const banks = await bankAccountServices.getAllBankAccounts();

    return res.status(200).send(banks);
  } catch (err) {
    return next(err);
  }
};

exports.getBankAccount = async (req, res, next) => {
  try {
    const { bankAccountId } = req.params;

    const bank = await bankAccountServices.getBankAccount(bankAccountId);

    return res.status(200).send(bank);
  } catch (err) {
    return next(err);
  }
};
