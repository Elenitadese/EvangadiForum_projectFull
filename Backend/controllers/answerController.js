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
      `SELECT a.answerid, a.answer, a.userid, u.username
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

// Edit answer (author only)
async function editAnswer(req, res) {
  try {
    const { id } = req.params;
    const { answer } = req.body;
    const userid = req.user.userid;

    const [rows] = await dbconnect.execute(
      "SELECT * FROM answers WHERE answerid = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Answer not found" });
    }

    const answerData = rows[0];

    if (answerData.userid !== userid) {
      return res
        .status(403)
        .json({ message: "Not authorized to edit this answer" });
    }

    await dbconnect.execute(
      "UPDATE answers SET answer = ? WHERE answerid = ?",
      [answer, id]
    );

    res.status(200).json({ message: "Answer updated successfully" });
  } catch (error) {
    console.error("Error editing answer:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// Delete answer (author only)
async function deleteAnswer(req, res) {
  try {
    const { id } = req.params;
    const userid = req.user.userid;

    const [rows] = await dbconnect.execute(
      "SELECT * FROM answers WHERE answerid = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Answer not found" });
    }

    const answerData = rows[0];

    if (answerData.userid !== userid) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this answer" });
    }

    await dbconnect.execute("DELETE FROM answers WHERE answerid = ?", [id]);

    res.status(200).json({ message: "Answer deleted successfully" });
  } catch (error) {
    console.error("Error deleting answer:", error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  submitAnswer,
  getAnswers,
  editAnswer,
  deleteAnswer,
};