const Fees = require('../../models/fees/feesModel');
const { pagination } = require('../../utils/pagination');

exports.createOne = async (data) => {
  try {
    const fees = await Fees.create(data);
    return fees;
  } catch (err) {
    throw new Error(err);
  }
};

exports.updateOne = async (feesId, data) => {
  try {
    const fees = await Fees.update(
      {
        ...data,
      },
      { where: { id: feesId } }
    );
    return fees;
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteOne = async (feesId) => {
  try {
    const fees = await Fees.destroy({
      where: { id: feesId },
    });
    return fees;
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

    const fees = await Fees.findAndCountAll({
      where: whereClause,
      ...options,
      order: [[orderBy, sortBy]],
    });

    return {
      fees: fees.rows,
      pagination: pagination(pageNumber, itemPerPage, fees.count),
    };
  } catch (err) {
    throw new Error(err);
  }
};

exports.findById = async (feesId) => {
  try {
    const fees = await Fees.findByPk(feesId);
    return fees;
  } catch (err) {
    throw new Error(err);
  }
};

exports.findOne = async (query) => {
  try {
    const fees = await Fees.findOne({
      where: query,
    });
    return fees;
  } catch (err) {
    throw new Error(err);
  }
};
