const bankServices = require('../../services/banks/bankServices');


exports.createBank = async (req, res, next) => {
  try {
    const data = req.body;

    const { message } = await bankServices.createBank(data);

    return res.status(201).send({ message });
  } catch (err) {
    return next(err);
  }
};

exports.updateBank = async (req, res, next) => {
  try {
    const { bankId } = req.params;
    const data = req.body;

    const { message } = await bankServices.updateBank(bankId, {
      ...data,
    });

    return res.status(201).send({ message });
  } catch (err) {
    return next(err);
  }
};

exports.deleteBank = async (req, res, next) => {
  try {
    const { bankId } = req.params;

    const { message } = await bankServices.deleteBank(bankId);
    return res.status(201).send({ message });
  } catch (err) {
    return next(err);
  }
};

exports.getAllBanks = async (req, res, next) => {
  try {
    const banks = await bankServices.getAllBanks();

    return res.status(200).send(banks);
  } catch (err) {
    return next(err);
  }
};

exports.getBank = async (req, res, next) => {
  try {
    const { bankId } = req.params;

    const bank = await bankServices.getBank(bankId);

    return res.status(200).send(bank);
  } catch (err) {
    return next(err);
  }
};
