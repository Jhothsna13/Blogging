const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "JJhh13;;",
  database: "blogger",
});

module.exports = db;
