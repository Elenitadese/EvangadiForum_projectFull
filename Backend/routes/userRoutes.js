const express = require("express");
const router = express.Router();

// Import controller functions and middleware
const authMiddleware = require("../middleware/authMiddleware");
const { register, login, check } = require("../controllers/userController");

// User registration
router.post("/register", register);

// User login
router.post("/login", login);

// Check user authentication
router.get("/check", authMiddleware, check);

module.exports = router;
