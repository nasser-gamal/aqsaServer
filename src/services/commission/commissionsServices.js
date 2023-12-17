const commissionRepository = require('../../dataAccess/commission/commissionRepository.js');
const categoryRepository = require('../../dataAccess/category/categoryRepository.js');
const userRepository = require('../../dataAccess/auth/userRepository.js');
const segmentsRepository = require('../../dataAccess/segment/segmentsRepository.js');

const { checkResourceExists } = require('../../utils/checkResourceExists.js');
const constants = require('../../utils/constants.js');

const { Op } = require('sequelize');
const userCommissionRepository = require('../../dataAccess/commission/userCommission.repository.js');
const BadRequestError = require('../../utils/badRequestError.js');
const Segment = require('../../models/segmentsModel');
const Category = require('../../models/categoryModel');
const Commission = require('../../models/commission/commissionModel.js');
const CommissionItems = require('../../models/commission/CommissionItems.js');

const asyncHandler = require('express-async-handler');

const {
  createDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
} = require('../factory');
const User = require('../../models/userModel.js');
const SubCategory = require('../../models/subCategory.js');
const AgentCommission = require('../../models/commission/agentCommission.js');
const ApiFeature = require('../../utils/ApiFeature.js');

const isCommissionExist = async (commissionId) => {
  const commission = await userCommissionRepository.findById(commissionId);
  return checkResourceExists(commission, constants.COMMISSION_NOT_FOUND);
};

const findSegment = async (serviceId, amountTotal) => {
  const query = {
    serviceId,
    isDeleted: false,
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
  let commission = (percentage / 100) * +amountTotal;
  return commission;
};

// const calcTotalAgentOpration = () => {

//   let totalAmount = 0;
//   let counts = 0;
//   let totalCommissions = 0;

//    totalAmount += amountTotal;
//    counts += totalCount;
//    totalCommissions += commissionAmount;

// }

const createCommission = asyncHandler(
  async (
    agentCommissionId,
    segmentId,
    categoryId,
    amountTotal,
    totalCount,
    commissionAmount
  ) => {
    const commission = await Commission.create({
      agentCommId: agentCommissionId,
      segmentId: segmentId,
      categoryId: categoryId,
      amountTotal,
      totalCount,
      commissionAmount,
    });
    return commission;
  }
);
const createCommissionItem = asyncHandler(async (category, commissionId) => {
  const commissionItems = category.subCategories.map((subCategory) => ({
    subCategoryId: subCategory.id,
    amount: subCategory.amount,
    count: subCategory.count,
    commissionId: commissionId,
  }));
  await CommissionItems.bulkCreate(commissionItems);
});

exports.createAgentCommission = async (userId, data) => {
  try {
    const { agentId, month, year } = data;

  const agentCommission = await createDoc(AgentCommission, {
    agentId,
    month,
    year,
    createdBy: userId,
  });

  let agentTotalAmount = 0;
  let agentTotalCount = 0;
  let agentTotalCommission = 0;

  const promises = data.commissions.map(async (category) => {
    const categoryId = category.categoryId;
    const amountTotal = category.subCategories.reduce(
      (total, subCategory) => total + subCategory.amount,
      0
    );
    const totalCount = category.subCategories.reduce(
      (total, subCategory) => total + subCategory.count,
      0
    );
    const segment = await findSegment(categoryId, amountTotal);
    const commissionAmount = calcCommission(amountTotal, segment.percentage);

    const commission = await createCommission(
      agentCommission.id,
      segment.id,
      categoryId,
      amountTotal,
      totalCount,
      commissionAmount
    );

    await createCommissionItem(category, commission.id);

    agentTotalAmount += amountTotal;
    agentTotalCount += totalCount;
    agentTotalCommission += commissionAmount;
  });

  await Promise.all(promises);

  await updateDoc(AgentCommission, agentCommission.id, {
    amountTotal: agentTotalAmount,
    totalCount: agentTotalCount,
    commissionAmount: agentTotalCommission,
  });
  return { message: constants.CREATE_COMMISSION_SUCCESS };
  } catch (err) {
    console.log('error -------------------------------------', err)
 }
};

exports.updateCommission = async (commissionId, data) => {
  const { amountTotal, count, segment } = data;

  const getSegment = await findSegment(segment.service.id, amountTotal);
  const commission = calcCommission(amountTotal, getSegment.percentage);

  await commissionRepository.updateOne(commissionId, {
    amountTotal,
    commission,
    count,
    segmentId: getSegment.id,
  });

  return { message: constants.UPDATE_COMMISSION_SUCCESS };
};

exports.deleteCommission = async (commissionId) => {
  await isCommissionExist(commissionId);
  await commissionRepository.deleteOne(commissionId);

  return { message: constants.DELETE_COMMISSION_SUCCESS };
};

exports.getUserCommission = asyncHandler(async (query, queryObj) => {
  return await getDocs(AgentCommission, query, queryObj, [
    {
      model: User,
      as: 'agent',
      attributes: [
        'id',
        'accountName',
        'accountNumber',
        'userName',
        'phoneNumber',
        'nationalId',
        'address',
      ],
    },
    {
      model: Commission,
      as: 'commissions',
      include: [
        {
          model: Category,
          as: 'service',
          // where: { isDeleted: false },
          attributes: ['id', 'name'],
        },
        {
          model: Segment,
          as: 'segment',
          // where: { isDeleted: false },
          attributes: ['id', 'title', 'percentage'],
        },
        {
          model: CommissionItems,
          as: 'commissionItems',
          // where: { isDeleted: false },
          include: [
            {
              model: SubCategory,
              as: 'subCategory',
              // where: { isDeleted: false },
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    },
  ]);
});
// exports.aggregation = asyncHandler(async (queryObj, filterObj) => {
//   const { conditions } = new ApiFeature(queryObj)
//     .filter()

//   const docs = await AgentCommission.findAll({
//     where: {
//       ...conditions,
//       ...filterObj,
//       isDeleted: false,
//     },
//     raw: true,
//     attributes: [
//       [sequelize.fn('SUM', sequelize.col('amountTotal')), 'amountTotal'],
//       [sequelize.fn('SUM', sequelize.col('amountTotal')), 'amountTotal'],
//     ],
//   });

//   console.log(docs);
//   return { docs: docs[0] };
// });

exports.findCommissionById = async (commissionId) => {
  const commission = await isCommissionExist(commissionId);
  return { commission };
};
