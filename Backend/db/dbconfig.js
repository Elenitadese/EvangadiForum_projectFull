const mysql2 = require("mysql2");
require("dotenv").config(); // ✅ Load environment variables from .env

// Create a connection pool
const dbconnect = mysql2.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  port: process.env.port,
  connectionLimit: 10,
});

// Export promise-based pool
module.exports = dbconnect.promise();

// Optional: Test connection (uncomment to check DB)
dbconnect.getConnection((err, connection) => {
  if (err) {
    console.error("❌ DB connection failed:", err.message);
  } else {
    console.log("✅ DB connected successfully!");
    connection.release();
  }
});
