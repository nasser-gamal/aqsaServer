import * as systemMenuServices from '../../services/links/systemMenuServices.js';

export const createLink = async (req, res, next) => {
  try {
    const data = req.body;
    const img = req.file;

    const { message } = await systemMenuServices.createLink({ ...data, img });

    return res.status(201).send({ message });
  } catch (err) {
    return next(err);
  }
};

export const updateLink = async (req, res, next) => {
  try {
    const { linkId } = req.params;
    const data = req.body;
    const img = req.file;

    const { message } = await systemMenuServices.updateLink(linkId, {
      ...data,
      img,
    });

    return res.status(201).send({ message });
  } catch (err) {
    return next(err);
  }
};

export const deleteLink = async (req, res, next) => {
  try {
    const { linkId } = req.params;

    const { message } = await systemMenuServices.deleteLink(linkId);
    return res.status(201).send({ message });
  } catch (err) {
    return next(err);
  }
};

export const getAllLinks = async (req, res, next) => {
  try {
    const links = await systemMenuServices.getAllLinks();

    return res.status(200).send(links);
  } catch (err) {
    return next(err);
  }
};

export const getLink = async (req, res, next) => {
  try {
    const { linkId } = req.params;

    const link = await systemMenuServices.getLink(linkId);

    return res.status(200).send(link);
  } catch (err) {
    return next(err);
  }
};
