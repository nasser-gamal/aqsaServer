import Category from '../../models/category/categoryModel.js';
import { pagination } from '../../utils/pagination.js';


export const createOne = async (data) => {
  try {
    const category = await Category.create(data);
    return category;
  } catch (err) {
    throw new Error(err);
  }
};

export const updateOne = async (categoryId, data) => {
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

export const deleteOne = async (categoryId) => {
  try {
    const category = await Category.destroy({
      where: { id: categoryId },
    });
    return category;
  } catch (err) {
    throw new Error(err);
  }
};

export const findAll = async (page, limit, order, sort, whereClause) => {
  try {
    const pageNumber = +page || 1;
    const itemPerPage = +limit || 20;
    const orderBy = order || 'createdAt';
    const sortBy = sort || 'DESC';

    const categories = await Category.findAndCountAll({
      where: whereClause,
      order: [[orderBy, sortBy]],
      limit: itemPerPage,
      offset: (pageNumber - 1) * itemPerPage,
    });

    return {
      categories: categories.rows,
      pagination: pagination(pageNumber, itemPerPage, categories.count),
    };
  } catch (err) {
    throw new Error(err);
  }
};

export const findById = async (categoryId) => {
  try {
    const category = await Category.findByPk(categoryId);
    return category;
  } catch (err) {
    throw new Error(err);
  }
};

export const findOne = async (query) => {
  try {
    const category = await Category.findOne({
      where: query,
    });
    return category;
  } catch (err) {
    throw new Error(err);
  }
};
