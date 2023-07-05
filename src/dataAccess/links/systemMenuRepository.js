import SystemMenu from '../../models/links/systemMenuModel.js';
import Pages from '../../models/links/pagesModel.js';

export const createOne = async (data) => {
  try {
    const link = await SystemMenu.create(data);
    return link;
  } catch (err) {
    throw new Error(err);
  }
};

export const updateOne = async (linkId, data) => {
  try {
    const link = await SystemMenu.update(
      {
        ...data,
      },
      { where: { id: linkId } }
    );
    return link;
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteOne = async (linkId) => {
  try {
    const link = await SystemMenu.destroy({ where: { id: linkId } });
    return link;
  } catch (err) {
    throw new Error(err);
  }
};

export const findById = async (linkId) => {
  try {
    const link = await SystemMenu.findByPk(linkId, {
      include: { model: Pages },
    });
    return link;
  } catch (err) {
    throw new Error(err);
  }
};

export const findOne = async (query) => {
  try {
    const links = await SystemMenu.findOne({ where: query });
    return links;
  } catch (err) {
    throw new Error(err);
  }
};

export const findAll = async () => {
  try {
    const links = await SystemMenu.findAll({ include: { model: Pages } });
    return links;
  } catch (err) {
    throw new Error(err);
  }
};
