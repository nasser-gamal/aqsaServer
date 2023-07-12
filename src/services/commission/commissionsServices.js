const commissionRepository = require('../../dataAccess/commission/commissionRepository.js');
const categoryRepository = require('../../dataAccess/category/categoryRepository.js');
const userRepository = require('../../dataAccess/auth/userRepository.js');
const segmentsRepository = require('../../dataAccess/segment/segmentsRepository.js');

const { checkResourceExists } = require('../../utils/checkResourceExists.js');
const constants = require('../../utils/constants.js');

const { Op } = require('sequelize');
const userCommissionRepository = require('../../dataAccess/commission/userCommission.repository.js');
const BadRequestError = require('../../utils/badRequestError.js');
const Segment = require('../../models/segments/segmentsModel.js');
const Category = require('../../models/category/categoryModel.js');

const isCommissionExist = async (commissionId) => {
  const commission = await userCommissionRepository.findById(commissionId);
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
        end: { [Op.gte]: amountTotal },
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

exports.createCommission = async (userId, data) => {
  const { agentId, month, year, commissions } = data;

  await isAgentExist(agentId);

  const whereClause = { agentId, month, year };

  const { userCommission: userCommissionExist } =
    await userCommissionRepository.findOne(whereClause);

  if (userCommissionExist) {
    throw new BadRequestError(constants.USER_COMMISSION_EXIST);
  }

  const userCommission = await userCommissionRepository.createOne({
    agentId,
    month,
    year: 2023,
    createdBy: userId,
  });

  await Promise.all(
    commissions.map(async (commission) => {
      const segment = await findSegment(
        commission.serviceId,
        commission.amountTotal
      );
      const calccommission = calcCommission(
        commission.amountTotal,
        segment.percentage
      );
      await userCommission.createCommission({
        amountTotal: commission.amountTotal,
        commission: calccommission,
        segmentId: segment.id,
        count: commission.count,
      });
    })
  );

  return { message: constants.CREATE_COMMISSION_SUCCESS };
};

exports.updateCommission = async (commissionId, data) => {
  const { id, amountTotal, count, segment } = data;

  const userCommission = await isCommissionExist(commissionId);

  const getSegment = await findSegment(segment.service.id, amountTotal);
  const commission = calcCommission(amountTotal, getSegment.percentage);

  // await userCommission.setCommissions(
  //   [
  //     {
  //       amountTotal,
  //       commission,
  //       count,
  //       segmentId: getSegment.id,
  //       userCommissionId: userCommission.id,
  //     },
  //   ],
  //   { through: { where: { id: commissionId } } }
  // );

  return { message: constants.UPDATE_COMMISSION_SUCCESS };
};

exports.deleteCommission = async (commissionId) => {
  await isCommissionExist(commissionId);
  await commissionRepository.deleteOne(commissionId);

  return { message: constants.DELETE_COMMISSION_SUCCESS };
};

exports.findAllCommissions = async (queryParams) => {
  const { search, agentId, year, month } = queryParams;

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
    month,
    year,
  };

  if (agentId) {
    commissionQuery.agentId = agentId;
  }
  const { userCommission } = await userCommissionRepository.findOne(
    commissionQuery,
    userQuery
  );

  if (!userCommission) {
    return {
      commissions: [],
    };
  }

  const commissions = await userCommission.getCommissions({
    include: {
      model: Segment,
      as: 'segment',
      attributes: ['id', 'title', 'start', 'end', 'percentage'],
      include: {
        model: Category,
        as: 'service',
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'name', 'createdAt'],
      },
    },
  });

  const totalAmount = commissions.reduce((acc, commission) => {
    return acc + commission.amountTotal;
  }, 0);

  const totalCommissions = commissions.reduce((acc, commission) => {
    return acc + commission.commission;
  }, 0);

  return {
    userCommission,
    commissions,
    totalAmount: totalAmount.toFixed(2),
    totalCommissions: totalCommissions.toFixed(2),
  };
};

exports.findCommissionById = async (commissionId) => {
  const commission = await isCommissionExist(commissionId);
  return { commission };
};
