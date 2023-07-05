import * as pagesServices from '../../services/links/pagesServices.js';

export const createPage = async (req, res, next) => {
  try {
    const data = req.body;
    const img = req.file;

    const { message } = await pagesServices.createPage({ ...data, img });

    return res.status(201).send({ message });
  } catch (err) {
    return next(err);
  }
};

export const updatePage = async (req, res, next) => {
  try {
    const { pageId } = req.params;
    const data = req.body;
    const img = req.file;

    const { message } = await pagesServices.updatePage(pageId, {
      ...data,
      img,
    });

    return res.status(201).send({ message });
  } catch (err) {
    return next(err);
  }
};

export const deletePage = async (req, res, next) => {
  try {
    const { pageId } = req.params;

    const { message } = await pagesServices.deletePage(pageId);
    return res.status(201).send({ message });
  } catch (err) {
    return next(err);
  }
};

export const getAllPages = async (req, res, next) => {
  try {
    const pages = await pagesServices.getAllPages();

    return res.status(200).send(pages);
  } catch (err) {
    return next(err);
  }
};

export const getPage = async (req, res, next) => {
  try {
    const { pageId } = req.params;

    const page = await pagesServices.getPage(pageId);

    return res.status(200).send(page);
  } catch (err) {
    return next(err);
  }
};
