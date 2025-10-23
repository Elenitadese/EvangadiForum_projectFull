
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios/axios";
import AboutMessage from "./AboutMessage";
import { DotLoader } from "react-spinners"; // import DotLoader


function Login() {
  const navigate = useNavigate(); // to redirect after login

  // Track form input values
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); // Track form submission loading
  
  const [error, setError] = useState(null); // Track general error message
  const [fieldErrors, setFieldErrors] = useState({}); // Track which fields are invalid

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Update form state
    setFieldErrors({ ...fieldErrors, [e.target.name]: false }); // Reset field highlight on change
  };

  // Determine input CSS class based on error state
  const inputClass = (field) =>
    fieldErrors[field] ? "form-control border-danger" : "form-control";

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset general error
    setLoading(true); // Start loading

    // Frontend validation: check required fields
    let tempFieldErrors = {};
    let hasError = false;

    if (!formData.email) {
      tempFieldErrors.email = true;
      hasError = true;
    }
    if (!formData.password) {
      tempFieldErrors.password = true;
      hasError = true;
    }

    if (hasError) {
      setError("Please fill all required fields"); // Show error message
      setFieldErrors(tempFieldErrors); // Highlight invalid fields
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("/users/login", formData); // Send login request
      localStorage.setItem("auth-token", res.data.token); // Save token
      navigate("/"); // Redirect to home after success
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid credentials";
      setError(msg); // Show backend error message

      // Highlight fields based on backend response
      let newFieldErrors = {};
      if (msg.toLowerCase().includes("email")) newFieldErrors.email = true;
      if (msg.toLowerCase().includes("password")) newFieldErrors.password = true;
      setFieldErrors(newFieldErrors);
    }

    setLoading(false); // Stop loading
  };

  return (
    <div className="container mt-5 py-5">
      <div className="row justify-content-center align-items-center ">
        {/* Left: Login Form */}
        <div className="col-md-6 ">
          <div className="p-5 shadow-lg ">
            <h2 className="text-center">Login</h2>

            {error && <div className="alert alert-danger">{error}</div>} {/* Display error */}

            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              {/* Email */}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={inputClass("email")} // Highlight if error
              />

              {/* Password */}
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={inputClass("password")} // Highlight if error
              />

           <button
  type="submit"
  className="btn btn-warning fw-bold d-flex justify-content-center align-items-center gap-2"
  disabled={loading}
>
  {loading && <DotLoader color="#fff" size={15} />}
  {loading ? "Logging in..." : "Login"}
</button>

            </form>

            <p className="text-center mt-5">
              Don’t have an account?{" "}
              <Link to="/register" className="text-warning fw-bold">
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Right: About Message */}
        <div className="col-md-6">
          <AboutMessage /> {/* Display about info */}
        </div>
      </div>
    </div>
  );
}

export default Login;
