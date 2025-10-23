const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware"); // protect routes with auth
const {
  createQuestion,
  getAllQuestions,
  getSingleQuestion,
  editQuestion,
  deleteQuestion,
} = require("../controllers/quationcontroller"); // controller functions

// Create a new question (protected)
router.post("/createquestion", authMiddleware, createQuestion);

// Get all questions (protected)
router.get("/allquestion", authMiddleware, getAllQuestions);

// Get a single question by ID (protected)
router.get("/singlequestion/:id", authMiddleware, getSingleQuestion);

// Edit question (author only)
router.put("/editquestion/:id", authMiddleware, editQuestion);

// Delete question (author only)
router.delete("/deletequestion/:id", authMiddleware, deleteQuestion);

module.exports = router;
