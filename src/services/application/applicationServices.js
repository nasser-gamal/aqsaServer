const applicationRepository = require('../../dataAccess/applications/applicationRepository');
const constants = require('../../utils/constants');

exports.createApp = async (userId, data) => {
  const { name, img, isLink, link, apk, note } = data;

  await applicationRepository.createOne({
    name,
    img: img[0].path.replaceAll('\\', '/'),
    isLink,
    link: isLink ? link : null,
    apk: isLink == 'false' ? apk[0].path.replaceAll('\\', '/') : null,
    note,
    createdBy: userId,
  });

  return { message: constants.CREATE_APP_SUCCESS };
};

exports.getAllApps = async () => {
  const apps = await applicationRepository.findAll();
  return apps;
};

exports.downloadApp = async (appId) => {
  const app = await applicationRepository.findById(appId);
  console.log(app);
  return app;
};
