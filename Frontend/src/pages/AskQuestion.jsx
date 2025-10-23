
import React, { useState, useEffect, useContext } from "react";
import axios from "../axios/axios";
import { useNavigate } from "react-router-dom";
import { AppState } from "../App";

const AskQuestion = () => {
  const [formData, setFormData] = useState({ title: "", description: "", tag: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // Check for authentication on mount
   const { token } = useContext(AppState);
  useEffect(() => {
  const storedToken = localStorage.getItem("auth-token");

  if (!token && !storedToken) { 
    // If neither context token nor localStorage token exists
    navigate("/login"); 
  }
}, [navigate, token]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.title || !formData.description) {
      setError("Title and description are required");
      return;
    }

    try {
      const token = localStorage.getItem("auth-token");
      await axios.post(
        "/questions/createquestion",
        formData,
        { headers: { Authorization: "Bearer " + token } }
      );
      navigate("/"); // back to home on success
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create question");
    }
  };

  return (
    <div className="container py-5 mt-3">
      <h2>Ask a Question</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        <input
          type="text"
          name="title"
          placeholder="Question title"
          value={formData.title}
          onChange={handleChange}
          className="form-control"
        />

        <textarea
          name="description"
          placeholder="Question description"
          value={formData.description}
          onChange={handleChange}
          className="form-control"
          rows={4}
        />

        <input
          type="text"
          name="tag"
          placeholder="Tag (optional)"
          value={formData.tag}
          onChange={handleChange}
          className="form-control"
        />

        <button type="submit" className="btn btn-warning fw-bold">
          Post Question
        </button>
      </form>
    </div>
  );
};

export default AskQuestion;
