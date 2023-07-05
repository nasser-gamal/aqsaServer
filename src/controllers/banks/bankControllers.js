import * as bankServices from '../../services/banks/bankServices.js';


export const createBank = async (req, res, next) => {
  try {
    const data = req.body;

    const { message } = await bankServices.createBank(data);

    return res.status(201).send({ message });
  } catch (err) {
    return next(err);
  }
};

export const updateBank = async (req, res, next) => {
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

export const deleteBank = async (req, res, next) => {
  try {
    const { bankId } = req.params;

    const { message } = await bankServices.deleteBank(bankId);
    return res.status(201).send({ message });
  } catch (err) {
    return next(err);
  }
};

export const getAllBanks = async (req, res, next) => {
  try {
    const banks = await bankServices.getAllBanks();

    return res.status(200).send(banks);
  } catch (err) {
    return next(err);
  }
};

export const getBank = async (req, res, next) => {
  try {
    const { bankId } = req.params;

    const bank = await bankServices.getBank(bankId);

    return res.status(200).send(bank);
  } catch (err) {
    return next(err);
  }
};
