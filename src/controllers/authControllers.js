const asyncHandler = require('express-async-handler');
const authServices = require('../services/authServices');
const constants = require('../utils/constants');
const sendResponse = require('../utils/sendResponse');

exports.login = asyncHandler(async (req, res) => {
  const { user, token } = await authServices.userLogin(req.body);

  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
  sendResponse(res, {
    statusCode: 200,
    data: user,
  });
});

exports.logout = asyncHandler((req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
  });
  sendResponse(res, {
    statusCode: 200,
    message: constants.LOGOUT,
  });
});
