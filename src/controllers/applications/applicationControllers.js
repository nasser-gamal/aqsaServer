const applicationServices = require('../../services/application/applicationServices');

exports.createApp = async (req, res, next) => {
  try {
    const data = req.body;
    const { img, apk } = req.files;
    const userId = req.user.id;


    const { message } = await applicationServices.createApp(userId, {
      ...data,
      img,
      apk,
    });

    return res.status(201).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.updateApp = async (req, res, next) => {
  try {
    const data = req.body;
    const { img, apk } = req.files;
    const { appId } = req.params;

    const { message } = await applicationServices.updateApp(appId, {
      ...data,
      img,
      apk,
    });

    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.deleteApp = async (req, res, next) => {
  try {
    const { appId } = req.params;
    const { message } = await applicationServices.deleteApp(appId);

    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.getAllApps = async (req, res, next) => {
  try {
    const apps = await applicationServices.getAllApps();

    return res.status(200).json(apps);
  } catch (err) {
    return next(err);
  }
};

exports.downloadApp = async (req, res, next) => {
  try {
    const { appId } = req.params;
    const app = await applicationServices.downloadApp(appId);

    return res.download(app.apk);
  } catch (err) {
    return next(err);
  }
};
