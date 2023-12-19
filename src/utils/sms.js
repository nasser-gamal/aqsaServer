const axios = require('axios');
const { config } = require('../config/config');
const asyncHandler = require('express-async-handler');

exports.sendSMSMessage = asyncHandler(async (mobile, message) => {
  try {
    const query = `?username=${config.sms.username}&password=${config.sms.password}&sender=${config.sms.sender}&environment=${config.sms.environment}&language=${config.sms.language}&mobile=${mobile}&message=${message}`;
    const response = await axios.post(`${config.sms.url}${query}`);
    return response;
  } catch (err) {
    return err;
  }
});
