import Treasury from '../../models/treasury/treasuryModel.js';


export const findOne = async () => {
  try {
    const treasury = await Treasury.findOne({});
    return treasury;
  } catch (err) {
    throw new Error(err);
  }
};

export const updateOne = async (treasuryId) => {
  try {
    const treasury = await Treasury.update(
      {
        ...data,
      },
      { where: { id: treasuryId } }
    );

    return treasury;
  } catch (err) {
    throw new Error(err);
  }
};
