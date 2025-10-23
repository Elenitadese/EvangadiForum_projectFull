import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppState } from "../App";
import { DotLoader } from "react-spinners"; // import DotLoader
import imglogo from '../Imag/imglogo.png'; // import logo image
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const Header = () => {
  const { user, setUser } = useContext(AppState); // get user state from context
  const [loading, setLoading] = useState(false); // new loading state
  const navigate = useNavigate(); // navigate programmatically

  const handleLogout = () => {
    setLoading(true); // show loader while logging out
    setTimeout(() => {
      localStorage.removeItem("auth-token"); // remove token from localStorage
      setUser(null); // clear user state
      setLoading(false);
      navigate("/login"); // redirect to login page
    }, 500); // simulate small delay for UX
  };

  return (
  <nav className="navbar navbar-expand-lg px-4 py-2 fixed-top shadow" style={{ backgroundColor: "#ffffff" }}>
  <div className="container-fluid">
    <Link className="navbar-brand d-flex align-items-center" to="/">
      <img
        src={imglogo}
        alt="Logo"
        style={{ width: "50%", height: "auto" }}
      />
    </Link>



        <div className="d-flex align-items-center">
          {loading ? (
            <DotLoader color="#FFC107" size={25} /> // show loader
          ) : user ? (
            <div className="d-flex flex-column flex-sm-row align-items-sm-center">
              <span className="text-dark me-sm-3 mb-2 mb-sm-0">
                <AccountCircleIcon/> {user.username}
              </span>
              <button
                className="btn btn-outline-warning btn-sm ms-auto"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
               <Link to="/HowitWork" className="btn-sm me-2" style={{ textDecoration: "none" }}>
                How it Works
              </Link>
              <Link to="/login" className="btn btn-warning btn-sm me-2">
                Login
              </Link>
              <Link to="/register" className="btn btn-outline-warning btn-sm">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
