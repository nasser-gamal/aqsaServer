import * as agentServices from '../../services/auth/agentServices.js';

export const getAllAgents = async (req, res, next) => {
  try {
    const users = await agentServices.getAllAgents();

    return res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
};

export const addAgent = async (req, res, next) => {
  try {
    const userData = req.body;

    const { message, password } = await agentServices.createAgent(userData);

    return res.status(201).json({ message: message, password });
  } catch (err) {
    return next(err);
  }
};

export const updateAgent = async (req, res, next) => {
  try {
    const userData = req.body;
    const { userId } = req.params;

    const { message } = await agentServices.updateAgent(userId, userData);

    return res.status(200).json({ message: message });
  } catch (err) {
    return next(err);
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { message } = await agentServices.updatePassword(userId);

    return res.status(200).json({ message: message });
  } catch (err) {
    return next(err);
  }
};

export const updateUserStatus = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const { message } = await agentServices.updateStatus(userId);

    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

export const deleteAgent = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const { message } = await agentServices.deleteAgent(userId);

    return res.status(200).json({ message: message });
  } catch (err) {
    return next(err);
  }
};
