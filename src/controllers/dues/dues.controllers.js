const duesServices = require('../../services/dues/dues.service');

exports.createNewDues = async (req, res, next) => {
  try {
    const data = req.body;
    const userId = req.user.id;

    const { message } = await duesServices.createDues(userId, data);

    return res.status(201).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.updateDues = async (req, res, next) => {
  try {
    const data = req.body;
    const { dueId } = req.params;

    const { message } = await duesServices.updateDues(dueId, data);

    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.deleteDues = async (req, res, next) => {
  try {
    const { dueId } = req.params;

    const { message } = await duesServices.deleteDues(dueId);

    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.findAllDues = async (req, res, next) => {
  try {
    const query = req.query;
    const dues = await duesServices.findAllDues(query);
    return res.status(200).json(dues);
  } catch (err) {
    return next(err);
  }
};
