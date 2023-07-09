const Role = require('../../models/auth/roleModel');


exports.findById = async (roleId) => {
  try {
    const role = await Role.findByPk(roleId);
    return role;
  } catch (err) {
    throw new Error(err);
  }
};

exports.findAll = async () => {
  try {
    const role = await Role.findAll();
    return role;
  } catch (err) {
    throw new Error(err);
  }
};

exports.findOne = async (query) => {
  try {
    const role = await Role.findOne({ where: query });
    return role;
  } catch (err) {
    throw new Error(err);
  }
};

exports.createOne = async (data) => {
  try {
    const role = await Role.create(data);
    return role;
  } catch (err) {
    throw new Error(err);
  }
};

exports.updateOne = async (roleId, data) => {
  try {
    const role = await Role.update({ data }, { where: { id: roleId } });
    return role;
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteOne = async (roleId) => {
  try {
    const role = await Role.destroy({ where: { id: roleId } });
    return role;
  } catch (err) {
    throw new Error(err);
  }
};
