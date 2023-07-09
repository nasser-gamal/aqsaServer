const axios = require('axios')

let language = 2;
let environment = 1;

let api = 'https://smsmisr.com/api/SMS/';

exports.sendSMSMessage = async (mobile, message) => {
  try {
    const response = await axios.post(
      `${api}?username=${process.env.SMS_USER_NAME}&password=${process.env.SMS_PASSWORD}&sender=${process.env.SMS_SENDER}&environment=${environment}&language=${language}&mobile=${mobile}&message=${message}`
    );
    return response;
  } catch (err) {
    return err;
  }
};
