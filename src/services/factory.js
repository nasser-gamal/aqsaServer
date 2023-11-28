const asyncHandler = require('express-async-handler');
const getQuery = require('../utils/getQuery');
const { NotFoundError } = require('../utils/apiError');
const ApiFeature = require('../utils/ApiFeature');

exports.createDoc = asyncHandler(async (modelName, data) => {
  const doc = await modelName.create(data);
  return doc;
});

exports.getDocs = asyncHandler(
  async (modelName, queryObj, filterObj = {}, includeArr = []) => {
    const features = new ApiFeature(queryObj)
      .filter()
      .sort()
      .limitFields()
      .search();

    const { conditions, sortArr, included, excluded, keyword } = features;

    const numOfDocs = (
      await modelName.findAndCountAll({
        where: { isDeleted: false, ...conditions, ...filterObj },
      })
    ).count;

    const { pagination } = features.paginate(numOfDocs);

    const baseQuery = {
      where: {
        isDeleted: false,
        ...conditions,
        ...filterObj,
      },
      offset: pagination.offset,
      limit: pagination.limit,
      order: sortArr,
      attributes: { include: included, exclude: [...excluded, 'password'] },
      include: includeArr,
    };
    if (keyword) {
      baseQuery.where.name = { [Op.like]: `%${keyword}%` };
    }

    const docs = await modelName.findAll(baseQuery);
    return { docs, pagination };
  }
);

exports.getDoc = asyncHandler(
  async (modelName, id, attributes = {}, includeArr = []) => {
    const doc = await modelName.findOne({
      where: { id },
      attributes,
      include: includeArr,
    });
    if (!doc) throw new NotFoundError(`no doc found with this id ${id}`);
    return doc;
  }
);

exports.updateDoc = asyncHandler(async (modelName, id, data) => {
  const [doc] = await modelName.update(
    {
      ...data,
    },
    { where: { id } }
  );
  if (!doc) throw new NotFoundError(`no doc found with this id ${id}`);
  return doc;
});

exports.deleteDoc = asyncHandler(async (modelName, id) => {
  const doc = await modelName.destroy({ where: { id } });
  if (!doc) throw new NotFoundError(`no doc found with this id ${id}`);
  return doc;
});
