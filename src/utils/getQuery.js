// const { Op } = require('sequelize');
// const ApiFeature = require('./ApiFeature');

// const getQuery = (queryObj, numOfDocs, filterObj, includeArr) => {

  
//   const { conditions, sortArr, included, excluded, pagination, keyword } =
//     new ApiFeature(queryObj).filter().sort().limitFields().paginate(numOfDocs);
  
  
//   const baseQuery = {
//     where: {
//       isDeleted: false,
//       ...conditions,
//       ...filterObj,
//     },
//     offset: pagination.offset,
//     limit: pagination.limit,
//     order: sortArr,
//     attributes: { include: included, exclude: [...excluded, 'password'] },
//     include: includeArr,
//   };
//     if (keyword) {
//       baseQuery.where.name = { [Op.like]: `%${keyword}%` };
//     }


//   // if (keyword) {
//   //   return {
//   //     query: {
//   //       where: {
//   //         isDeleted: false,
//   //         ...conditions,
//   //         ...filterObj,
//   //         name: { [Op.like]: `%${keyword}%` },
//   //       },
//   //       offset: pagination.offset,
//   //       limit: pagination.limit,
//   //       order: sortArr,
//   //       attributes: { include: included, exclude: [...excluded, 'password'] },
//   //       include: includeArr,
//   //     },
//   //     pagination,
//   //   };
//   // } else {
//   //   return {
//   //     query: {
//   //       where: {
//   //         isDeleted: false,
//   //         ...conditions,
//   //         ...filterObj,
//   //       },
//   //       offset: pagination.offset,
//   //       limit: pagination.limit,
//   //       order: sortArr,
//   //       attributes: { include: included, exclude: [...excluded, 'password'] },
//   //       include: includeArr,
//   //     },
//   //     pagination,
//   //   };
//   // }
// };

// module.exports = getQuery;
