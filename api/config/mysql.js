require("dotenv").config();

const mysql = require("mysql2");
//const connection = mysql.createConnection();
const connection = mysql.createPool(process.env.DATABASE_URL);

module.exports = connection;
