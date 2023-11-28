const Application = require('../../models/applicationsModel');

exports.createOne = async (data) => {
  try {
    const application = await Application.create(data);
    return application;
  } catch (err) {
    throw new Error(err);
  }
};

exports.updateOne = async (appId, data) => {
  try {
    const application = await Application.update(
      { ...data },
      { where: { id: appId } }
    );
    return application;
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteOne = async (appId) => {
  try {
    const application = await Application.destroy({ where: { id: appId } });
    return application;
  } catch (err) {
    throw new Error(err);
  }
};

exports.findAll = async () => {
  try {
    const applications = await Application.findAll();
    return applications;
  } catch (err) {
    throw new Error(err);
  }
};

exports.findById = async (appId) => {
  try {
    const application = await Application.findByPk(appId);
    return application;
  } catch (err) {
    throw new Error(err);
  }
};

exports.findOne = async (filter) => {
  try {
    const application = await Application.findOne(filter);
    return application;
  } catch (err) {
    throw new Error(err);
  }
};
