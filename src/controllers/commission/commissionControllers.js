import * as commissionsServices from '../../services/commission/commissionsServices.js';

export const addCommission = async (req, res, next) => {
  try {
    const data = req.body;
    const userId = 7;
    // const userId = req.user.id;

    const { message } = await commissionsServices.createCommission(
      userId,
      data
    );
    return res.status(201).json({ message });
  } catch (err) {
    return next(err);
  }
};

export const updateCommission = async (req, res, next) => {
  try {
    const data = req.body;
    const { commissionId } = req.params;

    const { message } = await commissionsServices.updateCommission(
      commissionId,
      data
    );
    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

export const deleteCommission = async (req, res, next) => {
  try {
    const { commissionId } = req.params;

    const { message } = await commissionsServices.deleteCommission(
      commissionId
    );
    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

export const getAllCommissions = async (req, res, next) => {
  try {
    const query = req.query;
    const { commissions, pagination, totalAmount, totalCommissions } =
      await commissionsServices.findAllCommissions(query);
    return res
      .status(200)
      .json({ commissions, pagination, totalAmount, totalCommissions });
  } catch (err) {
    return next(err);
  }
};

export const getCommission = async (req, res, next) => {
  try {
    const { commissionId } = req.params;

    const { commission } = await commissionsServices.findCommissionById(
      commissionId
    );
    return res.status(200).json({ commission });
  } catch (err) {
    return next(err);
  }
};
