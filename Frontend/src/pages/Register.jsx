// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "../axios/axios";
// import AboutMessage from "./AboutMessage";

// function Register() {
//   const navigate = useNavigate(); // to redirect after successful registration

//   // Track form input values
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     username: "",
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false); // Track form submission loading
//   const [error, setError] = useState(null); // Track general error message
//   const [fieldErrors, setFieldErrors] = useState({}); // Track which fields are invalid

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value }); // Update form state
//     setFieldErrors({ ...fieldErrors, [e.target.name]: false }); // Reset field highlight on change
//   };

//   // Determine input CSS class based on error state
//   const inputClass = (field) =>
//     fieldErrors[field] ? "form-control border-danger" : "form-control";

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null); // Reset general error
//     setLoading(true); // Start loading

//     // Frontend validation: check required fields
//     let tempFieldErrors = {};
//     let hasError = false;

//     if (!formData.email) {
//       tempFieldErrors.email = true;
//       hasError = true;
//     }
//     if (!formData.first_name) {
//       tempFieldErrors.first_name = true;
//       hasError = true;
//     }
//     if (!formData.last_name) {
//       tempFieldErrors.last_name = true;
//       hasError = true;
//     }
//     if (!formData.username) {
//       tempFieldErrors.username = true;
//       hasError = true;
//     }
//     if (!formData.password) {
//       tempFieldErrors.password = true;
//       hasError = true;
//     }

//     if (hasError) {
//       setError("Please fill all required fields"); // Show error message
//       setFieldErrors(tempFieldErrors); // Highlight invalid fields
//       setLoading(false);
//       return;
//     }

//     try {
//       await axios.post("/users/register", formData); // Send register request
//       navigate("/login"); // Redirect to login after success
//     } catch (err) {
//       const msg = err.response?.data?.message || "Failed to register";
//       setError(msg); // Show backend error message

//       // Highlight fields based on backend response
//       let newFieldErrors = {};
//       if (msg.toLowerCase().includes("email")) newFieldErrors.email = true;
//       if (msg.toLowerCase().includes("username")) newFieldErrors.username = true;
//       if (msg.toLowerCase().includes("password")) newFieldErrors.password = true;
//       setFieldErrors(newFieldErrors);
//     }

//     setLoading(false); // Stop loading
//   };

//   return (
//     <div className="container mt-5 py-4">
//       <div className="row justify-content-center align-items-center">
//         {/* Left: Register Form */}
//         <div className="col-md-6">
//           <div className="p-3 shadow-lg">
//             <h2 className="text-center mb-4">Register</h2>

//             {error && <div className="alert alert-danger">{error}</div>} {/* Display error */}

//             <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
//               {/* Email */}
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={inputClass("email")} // Highlight if error
//               />

//               {/* First and Last Name side by side */}
//               <div className="d-flex gap-2">
//                 <input
//                   type="text"
//                   name="first_name"
//                   placeholder="First Name"
//                   value={formData.first_name}
//                   onChange={handleChange}
//                   className={inputClass("first_name")} // Highlight if error
//                 />
//                 <input
//                   type="text"
//                   name="last_name"
//                   placeholder="Last Name"
//                   value={formData.last_name}
//                   onChange={handleChange}
//                   className={inputClass("last_name")} // Highlight if error
//                 />
//               </div>

//               {/* Username */}
//               <input
//                 type="text"
//                 name="username"
//                 placeholder="Username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 className={inputClass("username")} // Highlight if error
//               />

//               {/* Password */}
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className={inputClass("password")} // Highlight if error
//               />

//               <button
//                 type="submit"
//                 className="btn btn-warning fw-bold"
//                 disabled={loading}
//               >
//                 {loading ? "Submitting..." : "Register"} {/* Show loading */}
//               </button>
//             </form>

//             <p className="text-center mt-3">
//               Already have an account?{" "}
//               <Link to="/login" className="text-warning fw-bold">
//                 Log in
//               </Link>
//             </p>
//           </div>
//         </div>

//         {/* Right: About Message */}
//         <div className="col-md-6">
//           <AboutMessage /> {/* Display about info */}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios/axios";
import AboutMessage from "./AboutMessage";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // 👁️

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: false });
  };

  const inputClass = (field) =>
    fieldErrors[field] ? "form-control border-danger" : "form-control";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    let tempFieldErrors = {};
    let hasError = false;

    ["email", "first_name", "last_name", "username", "password"].forEach(
      (key) => {
        if (!formData[key]) {
          tempFieldErrors[key] = true;
          hasError = true;
        }
      }
    );

    if (hasError) {
      setError("Please fill all required fields");
      setFieldErrors(tempFieldErrors);
      setLoading(false);
      return;
    }

    try {
      await axios.post("/users/register", formData);
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to register";
      setError(msg);

      let newFieldErrors = {};
      if (msg.toLowerCase().includes("email")) newFieldErrors.email = true;
      if (msg.toLowerCase().includes("username"))
        newFieldErrors.username = true;
      if (msg.toLowerCase().includes("password"))
        newFieldErrors.password = true;
      setFieldErrors(newFieldErrors);
    }

    setLoading(false);
  };

  return (
    <div className="container mt-5 py-4">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="p-3 shadow-lg">
            <h2 className="text-center mb-4">Register</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={inputClass("email")}
              />

              <div className="d-flex gap-2">
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className={inputClass("first_name")}
                />
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className={inputClass("last_name")}
                />
              </div>

              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className={inputClass("username")}
              />

              {/* Password with toggle */}
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`${inputClass("password")} pe-5`}
                />
                <i
                  className={`bi ${
                    showPassword ? "bi-eye-slash" : "bi-eye"
                  } position-absolute`}
                  style={{
                    top: "50%",
                    right: "15px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              </div>

              <button
                type="submit"
                className="btn btn-warning fw-bold"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Register"}
              </button>
            </form>

            <p className="text-center mt-3">
              Already have an account?{" "}
              <Link to="/login" className="text-warning fw-bold">
                Log in
              </Link>
            </p>
          </div>
        </div>

        <div className="col-md-6">
          <AboutMessage />
        </div>
      </div>
    </div>
  );
}

export default Register;
