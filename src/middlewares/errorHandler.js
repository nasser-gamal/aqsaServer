const { StatusCodes } = require('http-status-codes');
const { ApiError } = require('../utils/apiError');
const { config } = require('../config/config');

const sendErrorForDev = (err, res) => {
  res.status(err.status).json({
    status: err.status,
    statusText: err.statusText,
    message: err.message,
  });
};

const sendErrorForProd = (err, res) => {
  res.status(err.status).json({
    status: err.status,
    message: err.message,
  });
};

const globalError = (err, req, res, next) => {
  const errObj = {
    // message:
    // config.app.env === 'development' ? err.message : 'something went wrong',
    message: err.message,
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    statusText: 'Error',
    stack: err.stack,
    error: err,
  };

  if (err instanceof ApiError) {
    errObj.status = err.status;
    errObj.message = err.message;
    errObj.statusText = err.statusText;
    errObj.stack = err.stack;
  }

  if (config.app.env === 'development') {
    sendErrorForDev(errObj, res);
  } else {
    sendErrorForProd(errObj, res);
  }
};

module.exports = globalError;
