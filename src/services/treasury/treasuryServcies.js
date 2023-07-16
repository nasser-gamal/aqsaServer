const treasuryRepository = require('../../dataAccess/treasury/treasuryRepository');

exports.getTreasury = async  () => {
  const treasury = await treasuryRepository.findOne();
  return treasury;
};
