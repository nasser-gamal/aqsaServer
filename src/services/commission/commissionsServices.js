import * as commissionRepository from '../../dataAccess/commission/commissionRepository.js';
import * as categoryRepository from '../../dataAccess/category/categoryRepository.js';
import * as userRepository from '../../dataAccess/auth/userRepository.js';
import * as segmentsRepository from '../../dataAccess/segment/segmentsRepository.js';

import { checkResourceExists } from '../../utils/checkResourceExists.js';
import constants from '../../utils/constants.js';

import { Op } from 'sequelize';

const isCommissionExist = async (commissionId) => {
  const commission = await commissionRepository.findById(commissionId);
  return checkResourceExists(commission, constants.COMMISSION_NOT_FOUND);
};

const isCategoryExist = async (serviceId) => {
  const category = await categoryRepository.findById(serviceId);
  return checkResourceExists(category, constants.CATEGORY_NOT_FOUND);
};

const isAgentExist = async (agentId) => {
  const agent = await userRepository.findById(agentId);
  return checkResourceExists(agent, constants.AGENT_NOT_FOUND);
};

const findSegment = async (serviceId, amountTotal) => {
  const query = {
    serviceId,
    [Op.or]: [
      {
        start: { [Op.lte]: amountTotal },
        end: { [Op.gt]: amountTotal },
      },
      {
        start: { [Op.lte]: amountTotal },
        end: { [Op.eq]: null },
      },
    ],
  };
  const segment = await segmentsRepository.findOne(query);
  return segment;
};

const calcCommission = (amountTotal, percentage) => {
  let commission = (percentage / 100) * amountTotal;
  return commission;
};

export const createCommission = async (userId, data) => {
  const { agentId, commissions } = data;

  await isAgentExist(agentId);
  const lastCommissions = await Promise.all(
    commissions.map(async (commission) => {
      const segment = await findSegment(
        commission.serviceId,
        commission.amountTotal
      );
      const calccommission = calcCommission(
        commission.amountTotal,
        segment.percentage
      );
      commission.segmentId = segment.id;
      commission.commission = calccommission;
      commission.createdBy = userId;
      commission.agentId = agentId;
      return commission;
    })
  );

  await commissionRepository.createMany(lastCommissions);

  return { message: constants.CREATE_COMMISSION_SUCCESS };
};

export const updateCommission = async (commissionId, data) => {
  const { amountTotal, count, segment } = data;
  await isCommissionExist(commissionId);
  await isCategoryExist(segment.service.id);

  const getSegment = await findSegment(segment.service.id, amountTotal);
  const commission = calcCommission(amountTotal, getSegment.percentage);

  await commissionRepository.updateOne(commissionId, {
    amountTotal,
    commission,
    count,
    segmentId: segment.id,
  });

  return { message: constants.UPDATE_COMMISSION_SUCCESS };
};

export const deleteCommission = async (commissionId) => {
  await isCommissionExist(commissionId);
  await commissionRepository.deleteOne(commissionId);

  return { message: constants.DELETE_COMMISSION_SUCCESS };
};

export const findAllCommissions = async (queryParams) => {
  const { search, agentId, year, month } = queryParams;

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  // Search by agent
  let userQuery = {};

  if (search) {
    userQuery = {
      [Op.or]: {
        phoneNumber: search,
        accountNumber: search,
        nationalId: search,
      },
    };
  }

  // Search by commission
  let commissionQuery = {
    createdAt: {
      [Op.between]: [startDate, endDate],
    },
  };

  if (agentId) {
    commissionQuery.agentId = agentId;
  }

  const { commissions, pagination } = await commissionRepository.findAll(
    userQuery,
    commissionQuery
  );

  const totalAmount = commissions.reduce((acc, commission) => {
    return acc + commission.amountTotal;
  }, 0);

  const totalCommissions = commissions.reduce((acc, commission) => {
    return acc + commission.commission;
  }, 0);

  return { commissions, pagination, totalAmount, totalCommissions };
};

export const findCommissionById = async (commissionId) => {
  const commission = await isCommissionExist(commissionId);
  return { commission };
};
