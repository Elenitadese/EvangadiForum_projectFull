const dbconnect = require("../db/dbconfig"); // Import database connection

// Submit an answer
async function submitAnswer(req, res) {
  try {
    const { questionid, answer } = req.body; // Get question ID and answer from request
    const userid = req.user.userid; // Get user ID from authMiddleware

    if (!questionid || !answer) {
      return res
        .status(400)
        .json({ message: "Question ID and answer are required" });
    }

    const [result] = await dbconnect.execute(
      "INSERT INTO answers (questionid, userid, answer) VALUES (?, ?, ?)",
      [questionid, userid, answer]
    );

    res.status(201).json({
      message: "Answer submitted successfully",
      answerId: result.insertId, // Return new answer ID
    });
  } catch (error) {
    console.error("Error submitting answer:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// Get all answers for a question
async function getAnswers(req, res) {
  try {
    const { questionid } = req.params;

    const [rows] = await dbconnect.execute(
      `SELECT a.answerid, a.answer, u.username
       FROM answers a
       JOIN users u ON a.userid = u.userid
       WHERE a.questionid = ?
       ORDER BY a.answerid ASC`,
      [questionid]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching answers:", error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { submitAnswer, getAnswers };
