import * as roleServices from '../../services/auth/roleServices.js';

export const getAllRoles = async (req, res, next) => {
  try {
    const { roles } = await roleServices.getAllRoles();

    return res.status(200).json(roles);
  } catch (err) {
    return next(err);
  }
};

export const addRole = async (req, res, next) => {
  try {
    const roleData = req.body;

    const { message } = await roleServices.createRole(roleData);

    return res.status(201).json({ message });
  } catch (err) {
    return next(err);
  }
};

export const updateRole = async (req, res, next) => {
  try {
    const { roleId } = req.params;
    const roleData = req.body;

    const { message } = await roleServices.updateRole(roleId, roleData);

    return res.status(201).json({ message });
  } catch (err) {
    return next(err);
  }
};

export const deleteRole = async (req, res, next) => {
  try {
    const { roleId } = req.params;

    const { message } = await roleServices.deleteRole(roleId);

    return res.status(201).json({ message });
  } catch (err) {
    return next(err);
  }
};
