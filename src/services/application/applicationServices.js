const applicationRepository = require('../../dataAccess/applications/applicationRepository');
const { checkResourceExists } = require('../../utils/checkResourceExists');
const constants = require('../../utils/constants');

const isAppExist = async (appId) => {
  const app = await applicationRepository.findOne({ id: appId });
  return checkResourceExists(app, constants.APP_NOT_FOUND);
};

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

exports.updateApp = async (appId, data) => {
  const { name, img, isLink, link, apk, note } = data;

  const app = await isAppExist(appId);

  await applicationRepository.createOne({
    name,
    img: img && img[0].path.replaceAll('\\', '/'),
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
