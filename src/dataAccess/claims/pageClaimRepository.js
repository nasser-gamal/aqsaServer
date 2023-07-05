import SystemMenu from '../../models/links/systemMenuModel.js';
import PageClaim from '../../models/claims/pageClaimModel.js';


export const createOne = async (data) => {
  try {
    const pageClaim = await PageClaim.create(data);
    return pageClaim;
  } catch (err) {
    throw new Error(err);
  }
};

export const updateOne = async (pageClaimId, data) => {
  try {
    const pageClaim = await PageClaim.update(
      { ...data },
      { where: { id: pageClaimId } }
    );

    return pageClaim;
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteOne = async (pageClaimId) => {
  try {
    const pageClaim = await PageClaim.destroy({
      where: { id: pageClaimId },
    });

    return pageClaim;
  } catch (err) {
    throw new Error(err);
  }
};

export const findAll = async (query) => {
  try {
    const pageClaims = await PageClaim.findAll({
      where: query,
      include: [{ model: SystemMenu }],
    });

    return pageClaims;
  } catch (err) {
    throw new Error(err);
  }
};

export const findOne = async (query) => {
  try {
    const pageClaim = await PageClaim.findOne({
      where: query,
    });

    return pageClaim;
  } catch (err) {
    throw new Error(err);
  }
};
