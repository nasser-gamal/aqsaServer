const applicationRepository = require('../../dataAccess/applications/applicationRepository');
const { checkResourceExists } = require('../../utils/checkResourceExists');
const constants = require('../../utils/constants');
const deleteFile = require('../../utils/deleteFile');

const isAppExist = async (appId) => {
  const app = await applicationRepository.findById(appId);
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

  if (img) {
    deleteFile(app.img);
  }

  if (apk) {
    deleteFile(app.apk);
  }

  await applicationRepository.updateOne(appId, {
    name,
    img: img ? img[0].path.replaceAll('\\', '/') : app.img,
    isLink,
    link: isLink ? link : null,
    apk: isLink == 'false' && apk ? apk[0].path.replaceAll('\\', '/') : app.apk,
    note,
  });

  return { message: constants.UPDATE_APP_SUCCESS };
};

exports.deleteApp = async (appId) => {
  const app = await isAppExist(appId);

  deleteFile(app.img);

  if (app.apk) {
    deleteFile(app.apk);
  }

  await applicationRepository.deleteOne(appId);

  return { message: constants.DELETE_APP_SUCCESS };
};

exports.getAllApps = async () => {
  const apps = await applicationRepository.findAll();
  return apps;
};

exports.downloadApp = async (appId) => {
  const app = await applicationRepository.findById(appId);
  return app;
};
