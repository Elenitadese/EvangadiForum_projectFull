
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axios/axios";
import Swal from "sweetalert2"; // ✅ SweetAlert2 popup
import { DotLoader } from "react-spinners"; // ✅ Optional loader spinner

const EditQuestion = () => {
  const { id } = useParams(); // ✅ Get question ID from URL
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ✅ Fetch existing question data
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("auth-token");
        const res = await axios.get(`/questions/singlequestion/${id}`, {
          headers: { Authorization: "Bearer " + token },
        });

        setTitle(res.data.title || "");
        setDescription(res.data.description || "");
        setTag(res.data.tag || "");
      } catch (err) {
        console.error("Error fetching question:", err);
        setError("Failed to load question");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id]);

  // ✅ Handle update submission
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const token = localStorage.getItem("auth-token");
      await axios.put(
        `/questions/editquestion/${id}`,
        { title, description, tag },
        { headers: { Authorization: "Bearer " + token } }
      );

      // ✅ Success alert
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Your question has been successfully updated.",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/"); // ✅ Redirect to home after update
    } catch (err) {
      console.error("Error updating question:", err);
      setError("Failed to update question");

      // ✅ Error alert
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update your question. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Loader
  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <DotLoader color="#36d7b7" />
      </div>
    );

  // ✅ Error message
  if (error) return <div className="container py-5 text-danger">{error}</div>;

  // ✅ Main UI
  return (
    <div className="container py-5 mt-4">
      <h3 className="mb-4">Edit Your Question</h3>

      <form onSubmit={handleUpdate}>
        {/* Title */}
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Tag */}
        <div className="mb-3">
          <label className="form-label">Tag (optional)</label>
          <input
            type="text"
            className="form-control"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
        </div>

        {/* Update Button */}
        <button
          type="submit"
          className="btn btn-warning fw-semibold"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Question"}
        </button>
      </form>
    </div>
  );
};

export default EditQuestion;
