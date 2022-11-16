require('dotenv').config();
const mysql = require('mysql2');

class Database {
  constructor() {
    this.connection = mysql.createPool({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
    }).promise();
  }
}

module.exports = Database;
