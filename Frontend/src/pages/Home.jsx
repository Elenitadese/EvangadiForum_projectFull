import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios/axios";
import { AppState } from "../App";
import { DotLoader } from "react-spinners";
import QuestionsList from "./QuestionsList";
import Swal from "sweetalert2";

import "./Home.css";

const Home = () => {
  const { user } = useContext(AppState);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("auth-token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.get(
          `/questions/allquestion?search=${search}&page=${page}&limit=3`,
          { headers: { Authorization: "Bearer " + token } }
        );

        setQuestions(res.data.questions || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        console.error("Failed to load questions:", err);
        setError("Failed to load questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [navigate, search, page]);

  // Handle delete
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This question and its answers will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      const token = localStorage.getItem("auth-token");
      await axios.delete(`/questions/deletequestion/${id}`, {
        headers: { Authorization: "Bearer " + token },
      });

      setQuestions((prev) => prev.filter((q) => q.questionid !== id));
      Swal.fire("Deleted!", "Your question has been deleted.", "success");
    } catch (err) {
      console.error("Failed to delete question:", err);
      Swal.fire("Error!", "Failed to delete the question.", "error");
    }
  };

  if (error) return <div className="container py-5">{error}</div>;

  return (
    <div className="home-bg bg-light">
      <div className="container py-5 mt-4">
        <h2 className="mb-1">
          Welcome, <span className="fw-semibold">{user?.username || "Guest"}</span>
        </h2>

        <Link to="/ask-question" className="btn btn-warning mb-3">
          Ask Question
        </Link>

        <div className="mb-4" style={{ maxWidth: "1400px" }}>
          <input
            type="text"
            placeholder="Search questions..."
            className="form-control"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") setPage(1);
            }}
          />
        </div>

        {loading && (
          <div className="d-flex justify-content-center my-5">
            <DotLoader color="#36d7b7" />
          </div>
        )}

        {!loading && (
          <>
            <QuestionsList
              questions={questions}
              user={user}
              handleDelete={handleDelete}
            />

            <div className="d-flex justify-content-center align-items-center mt-4 gap-2">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Prev
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      <div style={{ height: "60px" }} />
    </div>
  );
};

export default Home;
