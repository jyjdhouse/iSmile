
const dotenv = require('dotenv')
dotenv.config()

console.log(process.env.DEV_DB)

module.exports = {
  "development": {
    "username": process.env.DEV_USER,
    "password": process.env.DEV_PASSWORD || null,
    "database": process.env.DEV_DB,
    "host": process.env.DEV_HOST,
    "port": process.env.DEV_PORT,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.MYSQLUSER,
    "password": process.env.MYSQLPASSWORD,
    "database": process.env.MYSQLDATABASE,
    "host": process.env.MYSQLHOST,
    "port": process.env.MYSQLPORT,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.MYSQLUSER,
    "password": process.env.MYSQLPASSWORD,
    "database": process.env.MYSQLDATABASE,
    "host": process.env.MYSQLHOST,
    "port": process.env.MYSQLPORT,
    "dialect": "mysql"
  }
}
