import User from '../../models/auth/userModel.js';
import BankAccount from '../../models/banks/bankAccountModel.js';
import Bank from '../../models/banks/bankModel.js';
import { pagination } from '../../utils/pagination.js';
import Transfer from '../../models/transaction/transferModel.js';

export const createOne = async (data) => {
  try {
    const transfer = await Transfer.create(data);
    return transfer;
  } catch (err) {
    throw new Error(err);
  }
};

export const updateOne = async (transferId, data) => {
  try {
    const transfer = await Transfer.update(
      {
        ...data,
      },
      { where: { id: transferId } }
    );
    return transfer;
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteOne = async (transferId) => {
  try {
    const transfer = await Transfer.destroy({
      where: { id: transferId },
    });
    return transfer;
  } catch (err) {
    throw new Error(err);
  }
};

export const findAll = async (page, limit, order, sort, whereClause) => {
  try {
    const pageNumber = +page || 1;
    const itemPerPage = +limit || 2;
    const orderBy = order || 'createdAt';
    const sortBy = sort || 'DESC';

    const transfers = await Transfer.findAndCountAll({
      where: whereClause,
      order: [[orderBy, sortBy]],
      limit: itemPerPage,
      offset: (pageNumber - 1) * itemPerPage,
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'userName', 'accountName'],
        },
        {
          model: BankAccount,
          as: 'sender',
          attributes: ['id', 'accountName', 'bankNumber', 'balance'],
          include: [{ model: Bank, attributes: ['id', 'bankName'] }],
        },
        {
          model: BankAccount,
          as: 'recipient',
          attributes: ['id', 'accountName', 'bankNumber', 'balance'],
          include: [{ model: Bank, attributes: ['id', 'bankName'] }],
        },
      ],
    });

    return {
      transfers: transfers.rows,
      pagination: pagination(pageNumber, itemPerPage, transfers.count),
    };
  } catch (err) {
    throw new Error(err);
  }
};

export const findById = async (transferId) => {
  try {
    const transfer = await Transfer.findByPk(transferId, {
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'userName', 'accountName'],
        },
        {
          model: BankAccount,
          as: 'sender',
          attributes: ['id', 'accountName', 'bankNumber', 'balance'],
          include: [{ model: Bank, attributes: ['id', 'bankName'] }],
        },
        {
          model: BankAccount,
          as: 'recipient',
          attributes: ['id', 'accountName', 'bankNumber', 'balance'],
          include: [{ model: Bank, attributes: ['id', 'bankName'] }],
        },
      ],
    });
    return transfer;
  } catch (err) {
    throw new Error(err);
  }
};

export const findOne = async (query) => {
  try {
    const transfer = await Transfer.findOne({
      where: query,
    });
    return transfer;
  } catch (err) {
    throw new Error(err);
  }
};
