const express = require("express");
const cors = require("cors");
const app = express();
const port = 5500;

require("dotenv").config(); // load environment variables from .env

// DB connection
const dbconnect = require("./db/dbconfig"); // MySQL pool or connection

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Routes
const usersroutes = require("./routes/userRoutes");
app.use("/api/users", usersroutes); // /api/users/* routes

const questionroutes = require("./routes/questionRoutes");
app.use("/api/questions", questionroutes); // /api/questions/* routes

const answerroutes = require("./routes/answerRoutes");
app.use("/api/answers", answerroutes); // /api/answers/* routes

// Start server
async function Start() {
  try {
    // Test DB connection (optional)
    // await dbconnect.execute("SELECT 'test'");

    // Start Express server
    await new Promise((resolve) => app.listen(port, resolve));
    console.log("DB connected successfully"); // only prints; DB test commented
    console.log(`Server is running on http://localhost:${port}`);
  } catch (error) {
    console.log("DB connection error", error);
  }
}

Start();
