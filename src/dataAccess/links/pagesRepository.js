import SystemPages from '../../models/links/pagesModel.js';


export const createOne = async (data) => {
  try {
    const page = await SystemPages.create(data);
    return page;
  } catch (err) {
    throw new Error(err);
  }
};

export const updateOne = async (pageId, data) => {
  try {
    const page = await SystemPages.update(
      { ...data },
      { where: { id: pageId } }
    );
    return page;
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteOne = async (pageId) => {
  try {
    const page = await SystemPages.destroy({ where: { id: pageId } });
    return page;
  } catch (err) {
    throw new Error(err);
  }
};

export const findById = async (pageId) => {
  try {
    const pages = await SystemPages.findByPk(pageId);
    return pages;
  } catch (err) {
    throw new Error(err);
  }
};

export const findOne = async (query) => {
  try {
    const page = await SystemPages.findOne({ where: query });
    return page;
  } catch (err) {
    throw new Error(err);
  }
};

export const findAll = async () => {
  try {
    const page = await SystemPages.findAll();
    return page;
  } catch (err) {
    throw new Error(err);
  }
};
