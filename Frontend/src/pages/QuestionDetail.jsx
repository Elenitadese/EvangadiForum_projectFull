import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios/axios";
import Answers from "./Answers";

const QuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("auth-token"); // token for answers component

  // Fetch question
  const fetchQuestion = async () => {
    try {
      const res = await axios.get(`/questions/singlequestion/${id}`, {
        headers: { Authorization: "Bearer " + token },
      });
      setQuestion(res.data);
    } catch (err) {
      console.error("Error fetching question:", err);
      setError("Failed to load question");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container py-5 mt-4">
      {question && (
        <>
          <h2 className="mb-3">{question.title}</h2>
          <p>{question.description}</p>
          {question.tag && <p><strong>Tag:</strong> {question.tag}</p>}
          <p className="text-muted">Asked by {question.username}</p>
          <hr />
        </>
      )}

      {/* Render Answers component */}
      <Answers questionId={id} token={token} />
    </div>
  );
};

export default QuestionDetail;
