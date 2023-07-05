import { Op } from 'sequelize';
import * as categoryRepository from '../../dataAccess/category/categoryRepository.js';

import BadRequestError from '../../utils/badRequestError.js';
import { checkResourceExists } from '../../utils/checkResourceExists.js';
import constants from '../../utils/constants.js';

const isCategoryExist = async (query) => {
  const category = await categoryRepository.findOne(query);
  return category;
};

export const createCategory = async (userId, data) => {
  const { name, note } = data;

  const category = await isCategoryExist({ name });

  if (category) {
    throw new BadRequestError(constants.CATEGORY_EIXST);
  }

  await categoryRepository.createOne({
    name,
    note,
    createdBy: userId,
  });

  return { message: constants.CREATE_CATEGORY_SUCCESS };
};

export const updateCategory = async (categoryId, data) => {
  const { name, note } = data;

  const category = await isCategoryExist({ id: categoryId });
  checkResourceExists(category, constants.CATEGORY_NOT_FOUND);

  const existCategory = await isCategoryExist({
    [Op.and]: {
      id: { [Op.ne]: categoryId },
      name,
    },
  });

  if (existCategory) {
    throw new BadRequestError(constants.CATEGORY_EIXST);
  }

  await categoryRepository.updateOne(categoryId, {
    name,
    note,
  });

  return { message: constants.UPDATE_CATEGORY_SUCCESS };
};

export const deleteCategory = async (categoryId) => {
  const category = await isCategoryExist({ id: categoryId });
  checkResourceExists(category, constants.CATEGORY_NOT_FOUND);

  await categoryRepository.deleteOne(categoryId);

  return { message: constants.DELETE_CATEGORY_SUCCESS };
};

export const findAllCategories = async () => {
  const categories = await categoryRepository.findAll();
  return { categories };
};

export const findCategoryById = async (categoryId) => {
  const category = await isCategoryExist({ id: categoryId });
  checkResourceExists(category, constants.CATEGORY_NOT_FOUND);
  return { category };
};
