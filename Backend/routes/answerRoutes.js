const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  submitAnswer,
  getAnswers,
  editAnswer,
  deleteAnswer,
} = require("../controllers/answerController");

// Submit an answer (protected)
router.post("/createanswer", authMiddleware, submitAnswer);

// Get all answers for a question (protected)
router.get("/question/:questionid", authMiddleware, getAnswers);

// Edit answer (author only)
router.put("/editanswer/:id", authMiddleware, editAnswer);

// Delete answer (author only)
router.delete("/deleteanswer/:id", authMiddleware, deleteAnswer);

module.exports = router;