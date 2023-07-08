import * as categoryServices from '../../services/category/categoryServices.js';

export const addCategory = async (req, res, next) => {
  try {
    const data = req.body;
    const userId = 7;
    // const userId = req.user.id;
    const { message } = await categoryServices.createCategory(userId, data);
    return res.status(201).json({ message });
  } catch (err) {
    return next(err);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const data = req.body;
    const { categoryId } = req.params;
    const { message } = await categoryServices.updateCategory(categoryId, data);
    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const { message } = await categoryServices.deleteCategory(categoryId);
    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

export const getAllCategorys = async (req, res, next) => {
  try {
    const { categories } = await categoryServices.findAllCategories();
    return res.status(200).json(categories);
  } catch (err) {
    return next(err);
  }
};

export const getCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const { category } = await categoryServices.findCategoryById(categoryId);
    return res.status(200).json({ category });
  } catch (err) {
    return next(err);
  }
};
