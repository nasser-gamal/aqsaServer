const categoryServices = require('../../services/category/categoryServices');

exports.addCategory = async (req, res, next) => {
  try {
    const data = req.body;
    const userId = req.user.id;
    const { message } = await categoryServices.createCategory(userId, data);
    return res.status(201).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const data = req.body;
    const { categoryId } = req.params;
    const { message } = await categoryServices.updateCategory(categoryId, data);
    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const { message } = await categoryServices.deleteCategory(categoryId);
    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.getAllCategorys = async (req, res, next) => {
  try {
    const query = req.query;
    const { categories } = await categoryServices.findAllCategories(query);
    return res.status(200).json(categories);
  } catch (err) {
    return next(err);
  }
};

exports.getCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const { category } = await categoryServices.findCategoryById(categoryId);
    return res.status(200).json({ category });
  } catch (err) {
    return next(err);
  }
};
