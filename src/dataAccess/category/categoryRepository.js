const Category = require('../../models/category/categoryModel');
const { pagination } = require('../../utils/pagination');

exports.createOne = async (data) => {
  try {
    const category = await Category.create(data);
    return category;
  } catch (err) {
    throw new Error(err);
  }
};

exports.updateOne = async (categoryId, data) => {
  try {
    const category = await Category.update(
      {
        ...data,
      },
      { where: { id: categoryId } }
    );
    return category;
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteOne = async (categoryId) => {
  try {
    const category = await Category.destroy({
      where: { id: categoryId },
    });
    return category;
  } catch (err) {
    throw new Error(err);
  }
};

exports.findAll = async (whereClause, page, limit, order, sort) => {
  try {
    const pageNumber = +page || 1;
    const itemPerPage = +limit;
    const orderBy = order || 'createdAt';
    const sortBy = sort || 'ASC';

    let options;
    if (page && limit) {
      options = { limit: itemPerPage, offset: (pageNumber - 1) * itemPerPage };
    }

    const categories = await Category.findAndCountAll({
      where: whereClause,
      ...options,
      order: [[orderBy, sortBy]],
    });

    return {
      categories: categories.rows,
      pagination: pagination(pageNumber, itemPerPage, categories.count),
    };
  } catch (err) {
    throw new Error(err);
  }
};

exports.findById = async (categoryId) => {
  try {
    const category = await Category.findByPk(categoryId);
    return category;
  } catch (err) {
    throw new Error(err);
  }
};

exports.findOne = async (query) => {
  try {
    const category = await Category.findOne({
      where: query,
    });
    return category;
  } catch (err) {
    throw new Error(err);
  }
};
