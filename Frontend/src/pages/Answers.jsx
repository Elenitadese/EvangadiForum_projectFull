
// // Answers.jsx
// import React, { useState, useEffect } from "react";
// import axios from "../axios/axios";

// const Answers = ({ questionId, token }) => {
//   const [answers, setAnswers] = useState([]);
//   const [newAnswer, setNewAnswer] = useState("");
//   const [error, setError] = useState(null);

//   // Fetch answers for this question
//   const fetchAnswers = async () => {
//     try {
//       const res = await axios.get(`/answers/question/${questionId}`, {
//         headers: { Authorization: "Bearer " + token },
//       });
//       setAnswers(res.data);
//     } catch (err) {
//       console.error("Error fetching answers:", err);
//       setError("Failed to load answers");
//       setAnswers([]);
//     }
//   };

//   useEffect(() => {
//     fetchAnswers();
//   }, [questionId]);

//   // Submit a new answer
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!newAnswer.trim()) return;

//     try {
//       await axios.post(
//         "/answers/createanswer",
//         { questionid: questionId, answer: newAnswer },
//         { headers: { Authorization: "Bearer " + token } }
//       );
//       setNewAnswer("");
//       fetchAnswers(); // refresh answers
//     } catch (err) {
//       console.error("Error submitting answer:", err);
//       setError("Failed to submit answer");
//     }
//   };

//   return (
//     <div className="mt-4">
//       <h4>Answers</h4>
//       {error && <div className="alert alert-danger">{error}</div>}

//       {answers.length === 0 ? (
//         <p>No answers yet. Be the first to reply!</p>
//       ) : (
//         answers.map((a) => (
//           <div key={a.answerid} className="border rounded p-3 mb-3">
//             <p>{a.answer}</p>
//             <small className="text-muted">By {a.username}</small>
//           </div>
//         ))
//       )}

//       {/* Add New Answer Form */}
//       <div className="mt-3">
//         <h5>Your Answer</h5>
//         <form onSubmit={handleSubmit}>
//           <textarea
//             className="form-control mb-2"
//             rows="3"
//             placeholder="Write your answer..."
//             value={newAnswer}
//             onChange={(e) => setNewAnswer(e.target.value)}
//           />
//           <button className="btn btn-warning btn-sm" type="submit">
//             Post Answer
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Answers;

import React, { useState, useEffect, useContext } from "react";
import axios from "../axios/axios";
import { AppState } from "../App";
import Swal from "sweetalert2";

const Answers = ({ questionId, token }) => {
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [editingAnswerId, setEditingAnswerId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [error, setError] = useState(null);
  const { user } = useContext(AppState);

  // Fetch answers for this question
  const fetchAnswers = async () => {
    try {
      const res = await axios.get(`/answers/question/${questionId}`, {
        headers: { Authorization: "Bearer " + token },
      });
      setAnswers(res.data);
    } catch (err) {
      console.error("Error fetching answers:", err);
      setError("Failed to load answers");
      setAnswers([]);
    }
  };

  useEffect(() => {
    fetchAnswers();
  }, [questionId]);

  // Submit a new answer
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newAnswer.trim()) return;

    try {
      await axios.post(
        "/answers/createanswer",
        { questionid: questionId, answer: newAnswer },
        { headers: { Authorization: "Bearer " + token } }
      );
      setNewAnswer("");
      fetchAnswers(); // refresh answers
    } catch (err) {
      console.error("Error submitting answer:", err);
      setError("Failed to submit answer");
    }
  };

  // Start editing an answer
  const startEdit = (answer) => {
    setEditingAnswerId(answer.answerid);
    setEditingText(answer.answer);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingAnswerId(null);
    setEditingText("");
  };

  // Save edited answer
  const saveEdit = async (answerId) => {
    if (!editingText.trim()) return;

    try {
      await axios.put(
        `/answers/editanswer/${answerId}`,
        { answer: editingText },
        { headers: { Authorization: "Bearer " + token } }
      );
      setEditingAnswerId(null);
      setEditingText("");
      fetchAnswers(); // refresh answers

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Your answer has been successfully updated.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Error updating answer:", err);
      setError("Failed to update answer");
    }
  };

  // Delete an answer
  const handleDelete = async (answerId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This answer will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`/answers/deleteanswer/${answerId}`, {
        headers: { Authorization: "Bearer " + token },
      });
      fetchAnswers(); // refresh answers

      Swal.fire("Deleted!", "Your answer has been deleted.", "success");
    } catch (err) {
      console.error("Error deleting answer:", err);
      Swal.fire("Error!", "Failed to delete the answer.", "error");
    }
  };

  return (
    <div className="mt-4">
      <h4>Answers</h4>
      {error && <div className="alert alert-danger">{error}</div>}

      {answers.length === 0 ? (
        <p>No answers yet. Be the first to reply!</p>
      ) : (
        answers.map((a) => (
          <div key={a.answerid} className="border rounded p-3 mb-3">
            {editingAnswerId === a.answerid ? (
              // Edit mode
              <div>
                <textarea
                  className="form-control mb-2"
                  rows="3"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => saveEdit(a.answerid)}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // View mode
              <div>
                <p>{a.answer}</p>
                <small className="text-muted">By {a.username}</small>

                {/* Edit & Delete buttons (only for answer owner) */}
                {user?.userid === a.userid && (
                  <div className="d-flex gap-2 mt-2">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => startEdit(a)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(a.answerid)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))
      )}

      {/* Add New Answer Form */}
      <div className="mt-3">
        <h5>Your Answer</h5>
        <form onSubmit={handleSubmit}>
          <textarea
            className="form-control mb-2"
            rows="3"
            placeholder="Write your answer..."
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
          <button className="btn btn-warning btn-sm" type="submit">
            Post Answer
          </button>
        </form>
      </div>
    </div>
  );
};

export default Answers;