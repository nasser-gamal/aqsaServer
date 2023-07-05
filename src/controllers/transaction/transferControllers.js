import * as transferServices from '../../services/transaction/transferServices.js';

export const addTransfer = async (req, res, next) => {
  try {
    const data = req.body;
    const userId = req.user.id;

    const { message } = await transferServices.addTransfer(userId, data);
    return res.status(201).json({ message });
  } catch (err) {
    return next(err);
  }
};

export const updateTransfer = async (req, res, next) => {
  try {
    const { transactionId } = req.params;
    const data = req.body;
    const { message } = await transferServices.updateTransfer(
      transactionId,
      data
    );
    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

export const deleteTransfer = async (req, res, next) => {
  try {
    const { transactionId } = req.params;
    const { message } = await transferServices.deleteTransfer(transactionId);
    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

export const getAllTransfers = async (req, res, next) => {
  try {
    const { transfers, pagination } = await transferServices.findAllTransfers();
    return res.status(200).json({ transfers, pagination });
  } catch (err) {
    return next(err);
  }
};

export const getTransfer = async (req, res, next) => {
  try {
    const { transactionId } = req.params;
    const { transfer } = await transferServices.findTransfer(transactionId);
    return res.status(200).json(transfer);
  } catch (err) {
    return next(err);
  }
};
