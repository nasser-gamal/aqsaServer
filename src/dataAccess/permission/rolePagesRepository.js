import SystemMenu from '../../models/links/systemMenuModel.js';
import SystemPages from '../../models/links/pagesModel.js';
import rolePagesModel from '../../models/permissions/rolePagesModel.js';

export const createOne = async (data) => {
  try {
    const rolePage = await rolePagesModel.create(data);
    return rolePage;
  } catch (err) {
    throw new Error(err);
  }
};

export const updateOne = async (rolePageId, data) => {
  try {
    const rolePage = await rolePagesModel.update(
      { ...data },
      { where: { id: rolePageId } }
    );

    return rolePage;
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteOne = async (rolePageId) => {
  try {
    const rolePage = await rolePagesModel.destroy({
      where: { id: rolePageId },
    });

    return rolePage;
  } catch (err) {
    throw new Error(err);
  }
};

export const findAll = async (query) => {
  try {
    const rolePages = await rolePagesModel.findAll({
      where: query,
      include: [{ model: SystemMenu, include: { model: SystemPages } }],
    });

    return rolePages;
  } catch (err) {
    throw new Error(err);
  }
};

export const findOne = async (query) => {
  try {
    const rolePage = await rolePagesModel.findOne({
      where: query,
    });

    return rolePage;
  } catch (err) {
    throw new Error(err);
  }
};
