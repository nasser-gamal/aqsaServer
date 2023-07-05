import Role from '../../models/auth/roleModel.js';


export const findById = async (roleId) => {
  try {
    const role = await Role.findByPk(roleId);
    return role;
  } catch (err) {
    throw new Error(err);
  }
};

export const findAll = async () => {
  try {
    const role = await Role.findAll();
    return role;
  } catch (err) {
    throw new Error(err);
  }
};

export const findOne = async (query) => {
  try {
    const role = await Role.findOne({ where: query });
    return role;
  } catch (err) {
    throw new Error(err);
  }
};

export const createOne = async (data) => {
  try {
    const role = await Role.create(data);
    return role;
  } catch (err) {
    throw new Error(err);
  }
};

export const updateOne = async (roleId, data) => {
  try {
    const role = await Role.update({ data }, { where: { id: roleId } });
    return role;
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteOne = async (roleId) => {
  try {
    const role = await Role.destroy({ where: { id: roleId } });
    return role;
  } catch (err) {
    throw new Error(err);
  }
};
