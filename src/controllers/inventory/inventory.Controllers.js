const inventoryServices = require('../../services/inventory/inventory.Services');

exports.getProfits = async (req, res, next) => {
  try {
    const query = req.query;
    const { totalProfits, agentCommissions } =
      await inventoryServices.getProfits(query);
    return res.status(200).json({ totalProfits, agentCommissions });
  } catch (err) {
    next(err);
  }
};
