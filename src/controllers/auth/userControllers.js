const userServices = require('../../services/auth/userServices');

exports.getAllAdmins = async (req, res, next) => {
  try {
    const users = await userServices.getAllAdmins();
    return res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
};

// exports.getAllAgents = async (req, res, next) => {
//   try {
//     const users = await userServices.getAllAgents();

//     return res.status(200).json(users);
//   } catch (err) {
//     return next(err);
//   }
// };

exports.addUser = async (req, res, next) => {
  try {
    const userData = req.body;

    const { message, password } = await userServices.createUser(userData);

    return res.status(201).json({ message: message, password });
  } catch (err) {
    return next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const userData = req.body;
    const { userId } = req.params;

    const { message } = await userServices.updateUser(userId, userData);

    return res.status(200).json({ message: message });
  } catch (err) {
    return next(err);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const { message } = await userServices.updatePassword(userId);

    return res.status(200).json({ message: message });
  } catch (err) {
    return next(err);
  }
};

exports.updateUserStatus = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const { message } = await userServices.updateStatus(userId);

    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const { message } = await userServices.deleteUser(userId);

    return res.status(200).json({ message: message });
  } catch (err) {
    return next(err);
  }
};
