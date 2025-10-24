// const express = require("express");
// const cors = require("cors");
// const app = express();
// // const port = 5500;
// const port = process.env.PORT || 5500; // ✅ Use environment port or fallback


// require("dotenv").config(); // load environment variables from .env

// // DB connection
// const dbconnect = require("./db/dbconfig"); // MySQL pool or connection

// // Enable CORS for all routes
// app.use(cors());

// // Middleware to parse JSON requests
// app.use(express.json());

// // Routes
// const usersroutes = require("./routes/userRoutes");
// app.use("/api/users", usersroutes); // /api/users/* routes

// const questionroutes = require("./routes/questionRoutes");
// app.use("/api/questions", questionroutes); // /api/questions/* routes

// const answerroutes = require("./routes/answerRoutes");
// app.use("/api/answers", answerroutes); // /api/answers/* routes
// app.get("/", (req, res) => {
//   res.send("Backend is running successfully!");
// });
// // Start server
// async function Start() {
//   try {
//     // Test DB connection (optional)
//     // await dbconnect.execute("SELECT 'test'");

//     // Start Express server
//     await new Promise((resolve) => app.listen(port, resolve));
//     console.log("DB connected successfully"); // only prints; DB test commented
//     console.log(`Server is running on http://localhost:${port}`);
//   } catch (error) {
//     console.log("DB connection error", error);
//   }
// }

// Start();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5500;

require("dotenv").config();

// ✅ Verify crucial environment variables on startup
if (!process.env.JWT_SECRET) {
  console.error("❌ Fatal Error: JWT_SECRET is not defined");
  process.exit(1);
}

if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME) {
  console.error("❌ Fatal Error: Database configuration is missing");
  process.exit(1);
}

console.log(
  "✅ Environment loaded - JWT Secret:",
  process.env.JWT_SECRET ? "Present" : "Missing"
);

// DB connection
const dbconnect = require("./db/dbconfig");

app.use(cors());
app.use(express.json());

// Routes
const usersroutes = require("./routes/userRoutes");
app.use("/api/users", usersroutes);

const questionroutes = require("./routes/questionRoutes");
app.use("/api/questions", questionroutes);

const answerroutes = require("./routes/answerRoutes");
app.use("/api/answers", answerroutes);

app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

// Test endpoint to verify environment
app.get("/api/env-check", (req, res) => {
  res.json({
    jwtSecret: process.env.JWT_SECRET ? "✅ Present" : "❌ Missing",
    dbHost: process.env.DB_HOST ? "✅ Present" : "❌ Missing",
    dbUser: process.env.DB_USER ? "✅ Present" : "❌ Missing",
    dbName: process.env.DB_NAME ? "✅ Present" : "❌ Missing",
    port: process.env.PORT || 5500,
  });
});

// Start server
async function Start() {
  try {
    await new Promise((resolve) => app.listen(port, resolve));
    console.log(`✅ Server is running on port: ${port}`);
    console.log(
      `✅ JWT Secret: ${process.env.JWT_SECRET ? "Loaded" : "MISSING!"}`
    );
  } catch (error) {
    console.log("❌ Server startup error", error);
  }
}

Start();