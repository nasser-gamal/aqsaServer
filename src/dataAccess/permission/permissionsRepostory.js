import SystemMenu from '../../models/links/systemMenuModel.js';
import SystemPages from '../../models/links/pagesModel.js';
import RolePermission from '../../models/permissions/rolePermissionsModel.js';

export const createOne = async (data) => {
  try {
    const permission = await RolePermission.create(data);
    return permission;
  } catch (err) {
    throw new Error(err);
  }
};

export const updateOne = async (permissionId, data) => {
  try {
    const permission = await RolePermission.update(
      { ...data },
      { where: { id: permissionId } }
    );

    return permission;
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteOne = async (permissionId) => {
  try {
    const permission = await RolePermission.destroy({
      where: { id: permissionId },
    });

    return permission;
  } catch (err) {
    throw new Error(err);
  }
};

export const findAll = async (query) => {
  try {
    const permissions = await RolePermission.findAll({
      where: query,
      include: [{ model: SystemMenu, include: { model: SystemPages } }],
    });

    return permissions;
  } catch (err) {
    throw new Error(err);
  }
};

export const findOne = async (query) => {
  try {
    const permission = await RolePermission.findOne({
      where: query,
    });

    return permission;
  } catch (err) {
    throw new Error(err);
  }
};
