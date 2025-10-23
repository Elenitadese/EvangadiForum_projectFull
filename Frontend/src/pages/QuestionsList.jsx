
import React from "react"; // import React

const QuestionsList = ({ questions, user, handleDelete }) => {
  return (
    <>
      {questions.length === 0 ? (
        <p>No questions yet.</p> // no questions message
      ) : (
        questions.map((q) => (
          <div key={q.questionid} className="border p-3 mb-3 rounded">
            <a href={`/question/${q.questionid}`}>
              <h5>{q.title}</h5> {/* question title */}
            </a>
            <p>{q.description}</p> {/* question description */}
            <small className="text-muted d-block mb-2">
              Asked by {q.username} {/* question author */}
            </small>

            {/* Edit & Delete Buttons (only for question owner) */}
            {user?.userid === q.userid && (
              <div className="d-flex gap-2">
                <a
                  href={`/edit-question/${q.questionid}`}
                  className="btn btn-sm btn-outline-primary"
                >
                  Edit
                </a>
                <button
                  onClick={() => handleDelete(q.questionid)}
                  className="btn btn-sm btn-outline-danger"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </>
  );
};

export default QuestionsList; // export component
