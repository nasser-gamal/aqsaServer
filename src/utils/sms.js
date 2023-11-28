const axios = require('axios');
const { config } = require('../config/config');

exports.sendSMSMessage = async (mobile, message) => {
  try {
    const response = await axios.post(
      `${config.sms.url}?username=${config.sms.username}&password=${config.sms.password}&sender=${config.sms.sender}&environment=${config.sms.environment}&language=${config.sms.language}&mobile=${mobile}&message=${message}`
    );
    return response;
  } catch (err) {
    return err;
  }
};
