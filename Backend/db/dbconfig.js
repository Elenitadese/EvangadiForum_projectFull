const mysql2 = require("mysql2");
require("dotenv").config();

// ✅ Use consistent environment variable names
const dbconnect = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  connectionLimit: 10,
});

module.exports = dbconnect.promise();

// Test connection
dbconnect.getConnection((err, connection) => {
  if (err) {
    console.error("❌ DB connection failed:", err.message);
  } else {
    console.log("✅ DB connected successfully!");
    connection.release();
  }
});