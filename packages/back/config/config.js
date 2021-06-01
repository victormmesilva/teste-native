require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": null,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT,
  },
};
