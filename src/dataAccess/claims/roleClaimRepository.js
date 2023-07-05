import SystemMenu from '../../models/links/systemMenuModel.js';
import RoleClaim from '../../models/claims/roleClaimModel.js';


export const createOne = async (data) => {
  try {
    const roleClaim = await RoleClaim.create(data);
    return roleClaim;
  } catch (err) {
    throw new Error(err);
  }
};

export const updateOne = async (roleClaimId, data) => {
  try {
    const roleClaim = await RoleClaim.update(
      { ...data },
      { where: { id: roleClaimId } }
    );

    return roleClaim;
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteOne = async (roleClaimId) => {
  try {
    const roleClaim = await RoleClaim.destroy({
      where: { id: roleClaimId },
    });

    return roleClaim;
  } catch (err) {
    throw new Error(err);
  }
};

export const findAll = async (query) => {
  try {
    const roleClaims = await RoleClaim.findAll({
      where: query,
      include: [{ model: SystemMenu }],
    });

    return roleClaims;
  } catch (err) {
    throw new Error(err);
  }
};

export const findOne = async (query) => {
  try {
    const roleClaim = await RoleClaim.findOne({
      where: query,
    });

    return roleClaim;
  } catch (err) {
    throw new Error(err);
  }
};
