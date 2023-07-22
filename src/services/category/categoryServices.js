const { Op } = require('sequelize');
const categoryRepository = require('../../dataAccess/category/categoryRepository.js');

const BadRequestError = require('../../utils/badRequestError.js');
const { checkResourceExists } = require('../../utils/checkResourceExists.js');
const constants = require('../../utils/constants.js');

const isCategoryExist = async (query) => {
  const category = await categoryRepository.findOne(query);
  return category;
};

exports.createCategory = async (userId, data) => {
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

exports.updateCategory = async (categoryId, data) => {
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

exports.deleteCategory = async (categoryId) => {
  const category = await isCategoryExist({ id: categoryId });
  checkResourceExists(category, constants.CATEGORY_NOT_FOUND);

  await categoryRepository.deleteOne(categoryId);

  return { message: constants.DELETE_CATEGORY_SUCCESS };
};

exports.findAllCategories = async (query) => {
  const { page, limit, order, sort } = query;

  const categories = await categoryRepository.findAll(
    undefined,
    page,
    limit,
    order,
    sort
  );
  return { categories };
};

exports.findCategoryById = async (categoryId) => {
  const category = await isCategoryExist({ id: categoryId });
  checkResourceExists(category, constants.CATEGORY_NOT_FOUND);
  return { category };
};
