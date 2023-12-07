exports.config = {
  app: {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    filesPath: process.env.FILE_PATH,
  },
  db: {
    db_name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  client_URL_1: process.env.CLIENT_URL_1,
  client_URL_2: process.env.CLIENT_URL_2,
  sms: {
    url: process.env.SMS_API,
    username: process.env.SMS_USER_NAME,
    password: process.env.SMS_PASSWORD,
    sender: process.env.SMS_SENDER,
    language: process.env.SMS_LANGUAGE,
    environment: process.env.SMS_ENVIROMENT,
  },
};
