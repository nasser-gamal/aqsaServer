const asyncHandler = require('express-async-handler');
const applicationRepository = require('../dataAccess/applications/applicationRepository');
const { checkResourceExists } = require('../utils/checkResourceExists');
const constants = require('../utils/constants');
const deleteFile = require('../utils/deleteFile');
const {
  createDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
} = require('./factory');
const { BadRequestError } = require('../utils/apiError');
const Application = require('../models/applicationsModel');

const replacePath = (path) => {
  return path.replaceAll('\\', '/');
};

exports.createApp = asyncHandler(async (files, data) => {
  const img = replacePath(files.img[0].path);
  const apk = files.apk ? replacePath(files.apk[0].path) : null;

  data.img = img;
  data.apk = apk;
  await createDoc(Application, data);

  return { message: constants.CREATE_APP_SUCCESS };
});

exports.getApps = asyncHandler(async (query, filterObj) =>
  getDocs(Application, query, filterObj)
);

exports.getApp = asyncHandler(async (appId) => getDoc(Application, appId));

exports.updateApp = asyncHandler(async (appId, files, data) => {
  const { img, apk } = files;
  const app = await getDoc(Application, appId);

  if (img) {
    deleteFile(app.img);
    data.img = replacePath(files.img[0].path);
  }

  if (apk) {
    deleteFile(app.apk);
    data.apk = replacePath(files.apk[0].path);
  }

  await updateDoc(Application, appId, data);
  return { message: constants.UPDATE_APP_SUCCESS };
});

exports.deleteApp = asyncHandler(async (appId) => {
  const app = await getDoc(Application, appId);

  deleteFile(app.img);

  if (app.apk) {
    deleteFile(app.apk);
  }

  await deleteDoc(Application, appId);
  return { message: constants.DELETE_APP_SUCCESS };
});

// exports.downloadApp = asyncHandler(async (appId) => getDoc(Application, appId));
