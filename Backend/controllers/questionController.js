const dbconnect = require("../db/dbconfig"); // import database connection

// Create a new question
async function createQuestion(req, res) {
  try {
    const { title, description, tag } = req.body;
    const userid = req.user.userid;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    // Generate sequential questionid
    const [lastRow] = await dbconnect.execute(
      "SELECT questionid FROM questions ORDER BY id DESC LIMIT 1"
    );

    let newId =
      lastRow.length === 0
        ? "q001"
        : "q" +
          (parseInt(lastRow[0].questionid.slice(1)) + 1)
            .toString()
            .padStart(3, "0");

    await dbconnect.execute(
      "INSERT INTO questions (questionid, userid, title, description, tag) VALUES (?, ?, ?, ?, ?)",
      [newId, userid, title, description, tag || null]
    );

    res
      .status(201)
      .json({ message: "Question created successfully", questionId: newId });
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// Get all questions (with search and pagination)
async function getAllQuestions(req, res) {
  try {
    const search = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const offset = (page - 1) * limit;

    // Count total questions
    const [countRows] = await dbconnect.execute(
      "SELECT COUNT(*) AS total FROM questions WHERE title LIKE ? OR description LIKE ?",
      [`%${search}%`, `%${search}%`]
    );

    const totalQuestions = countRows[0].total;
    const totalPages = Math.ceil(totalQuestions / limit);

    // Fetch paginated questions
    const [rows] = await dbconnect.execute(
      `SELECT q.questionid, q.title, q.description, q.tag, q.userid, u.username
       FROM questions q
       JOIN users u ON q.userid = u.userid
       WHERE q.title LIKE ? OR q.description LIKE ?
       ORDER BY q.id DESC
       LIMIT ? OFFSET ?`,
      [`%${search}%`, `%${search}%`, limit, offset]
    );

    res.status(200).json({ questions: rows, totalPages });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// Get a single question by ID
async function getSingleQuestion(req, res) {
  try {
    const { id } = req.params;

    const [rows] = await dbconnect.execute(
      `SELECT q.questionid, q.title, q.description, q.tag, q.userid, u.username
       FROM questions q
       JOIN users u ON q.userid = u.userid
       WHERE q.questionid = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error fetching question:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// Edit question (author only)
async function editQuestion(req, res) {
  try {
    const { id } = req.params;
    const { title, description, tag } = req.body;
    const userid = req.user.userid;

    const [rows] = await dbconnect.execute(
      "SELECT * FROM questions WHERE questionid = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Question not found" });
    }

    const question = rows[0];

    if (question.userid !== userid) {
      return res
        .status(403)
        .json({ message: "Not authorized to edit this question" });
    }

    await dbconnect.execute(
      "UPDATE questions SET title = ?, description = ?, tag = ? WHERE questionid = ?",
      [
        title || question.title,
        description || question.description,
        tag || question.tag,
        id,
      ]
    );

    res.status(200).json({ message: "Question updated successfully" });
  } catch (error) {
    console.error("Error editing question:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// Delete question (author only)
async function deleteQuestion(req, res) {
  try {
    const { id } = req.params;
    const userid = req.user.userid;

    const [rows] = await dbconnect.execute(
      "SELECT * FROM questions WHERE questionid = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Question not found" });
    }

    const question = rows[0];

    if (question.userid !== userid) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this question" });
    }

    await dbconnect.execute("DELETE FROM questions WHERE questionid = ?", [id]);

    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  createQuestion,
  getAllQuestions,
  getSingleQuestion,
  editQuestion,
  deleteQuestion,
};
