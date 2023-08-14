const inventoryServices = require('../../services/inventory/inventoryServices');

exports.getInventroy = async (req, res, next) => {
  try {
    const query = req.query;
    const {
      totalAgentTreasury,
      totalProviderTreasury,
      totalAddionalTreasury,
      totalBankAmount,
      totalProfits,
      totalDues,
      totalCurrentBalance,
    } = await inventoryServices.getInventroy(query);
    return res.status(200).json({
      totalAgentTreasury,
      totalProviderTreasury,
      totalAddionalTreasury,
      totalBankAmount,
      totalProfits,
      totalDues,
      totalCurrentBalance,
    });
  } catch (err) {
    next(err);
  }
};
