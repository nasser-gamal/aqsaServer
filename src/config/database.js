const Sequelize = require('sequelize');
const dotenv = require('dotenv');
const { config } = require('./config');
dotenv.config();

const sequelize = new Sequelize(
  config.db.db_name,
  config.db.username,
  config.db.password,
  {
    dialect: 'mysql',
    host: config.db.host,
    logging: false, // Disable logging
  }
);

const connectDB = () => {
  sequelize
    .sync()
    .then((result) => {
      console.log('db connected');
    })
    .catch((err) => console.log(err));
};

module.exports = { connectDB, sequelize };
