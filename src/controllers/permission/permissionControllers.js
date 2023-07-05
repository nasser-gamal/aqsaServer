import * as permissionServices from '../../services/permission/permissionServices.js';

export const addPermmission = async (req, res, next) => {
  try {
    const data = req.body;
    const { message } = await permissionServices.createPermmission(data);
    return res.status(201).json({ message });
  } catch (err) {
    return next(err)
  }
};

export const updatePermmission = async (req, res, next) => {
  try {
    const data = req.body;
    const { permissionId } = req.params;
    const { message } = await permissionServices.updatePermmission(
      permissionId,
      data
    );
    return res.status(201).json({ message });
  } catch (err) {
    return next(err)
  }
};

export const deletePermmissison = async (req, res, next) => {
  try {
    const { permissionId } = req.params;
    const { message } = await permissionServices.deletePermmission(permissionId);
    return res.status(201).json({ message });
  } catch (err) {
    return next(err)
  }
};

export const getAllPermmissisons = async (req, res, next) => {
  try {
    const roleId = req.user.role.id;
    const { permissionPages } = await permissionServices.findAllPermmissions(
      roleId
    );
    return res.status(201).json({ permissionPages });
  } catch (err) {
    return next(err)
  }
};
