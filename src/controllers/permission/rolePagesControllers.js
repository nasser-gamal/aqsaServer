import * as rolePagesServices from '../../services/permission/rolePagesServices.js';

export const addRolePage = async (req, res, next) => {
  try {
    const data = req.body;
    const { message } = await rolePagesServices.createRolePage(data);
    return res.status(201).json({ message });
  } catch (err) {
    return next(err)
  }
};

// export const updatePermmission = async (req, res, next) => {
//   try {
//     const data = req.body;
//     const { permissionId } = req.params;
//     const { message } = await rolePagesServices.updatePermmission(
//       permissionId,
//       data
//     );
//     return res.status(201).json({ message });
//   } catch (err) {
//     return next(err)
//   }
// };

// export const deletePermmissison = async (req, res, next) => {
//   try {
//     const { permissionId } = req.params;
//     const { message } = await rolePagesServices.deletePermmission(permissionId);
//     return res.status(201).json({ message });
//   } catch (err) {
//     return next(err)
//   }
// };

// export const getAllPermmissisons = async (req, res, next) => {
//   try {
//     const roleId = req.user.role.id;
//     const { permissionPages } = await rolePagesServices.findAllPermmissions(
//       roleId
//     );
//     return res.status(201).json({ permissionPages });
//   } catch (err) {
//     return next(err)
//   }
// };
