const User = require('../../models/auth/userModel');
const Due = require('../../models/dues/duesModel');
const { pagination } = require('../../utils/pagination');

exports.createOne = async (data) => {
  try {
    const due = await Due.create(data);
    return due;
  } catch (err) {
    throw new Error(err);
  }
};

exports.updateOne = async (dueId, data) => {
  try {
    const due = await Due.update({ ...data }, { where: { id: dueId } });
    return due;
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteOne = async (dueId) => {
  try {
    const due = await Due.destroy({ where: { id: dueId } });
    return due;
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

    const due = await Due.findAndCountAll({
      where: whereClause,
      ...options,
      order: [[orderBy, sortBy]],
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'userName', 'accountName'],
        },
      ],
    });

    return {
      dues: due.rows,
      pagination: pagination(pageNumber, itemPerPage, due.count),
    };
  } catch (err) {
    throw new Error(err);
  }
};

exports.findOne = async (query) => {
  try {
    const due = await Due.findOne({ where: query });
    return due;
  } catch (err) {
    throw new Error(err);
  }
};

exports.findById = async (dueId) => {
  try {
    const due = await Due.findByPk(dueId);
    return due;
  } catch (err) {
    throw new Error(err);
  }
};
