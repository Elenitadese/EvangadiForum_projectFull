const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { submitAnswer, getAnswers } = require("../controllers/answerController");

// Submit an answer (protected)
router.post("/createanswer", authMiddleware, submitAnswer);

// Get all answers for a question (protected)
router.get("/question/:questionid", authMiddleware, getAnswers);

module.exports = router;
