
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import axios from "./axios/axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AskQuestion from "./pages/AskQuestion";
import QuestionDetail from "./pages/QuestionDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EditQuestion from "./pages/EditQuestion";
import HowitWork from "./pages/HowitWork";



// create global context for user
export const AppState = createContext(); 
function App() {
  // track logged-in user
  const [user, setUser] = useState(null); 

  // get current route
  const location = useLocation(); 

  // check user token from localStorage
  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      setUser(null); // no token, no user
      return;
    }

    axios.get("/users/check", {
        // send token for auth
        headers: { Authorization: "Bearer " + token }, 
      })
      .then((res) =>
        // set user data
        setUser({ username: res.data.username, userid: res.data.userid }) 
      )
      .catch(() => {
        // remove invalid token
        localStorage.removeItem("auth-token"); 
        setUser(null);
      });
  }, [location.pathname]);

  // redirect to login if no token and not on /login or /register
  const token = localStorage.getItem("auth-token");
  if (!token && location.pathname !== "/login" && location.pathname !== "/register"&& location.pathname !== "/HowitWork") {
    return <Navigate to="/login" replace />; // protect routes
  }

  return (
    <AppState.Provider value={{ user, setUser }}>
      <div className="d-flex flex-column min-vh-100" >
        <Header /> {/* top navigation */}
        <main className="flex-fill container my-4">
          <Routes>
            <Route path="/" element={<Home />} /> // home page
            <Route path="/ask-question" element={<AskQuestion />} /> // ask question page
            <Route path="/question/:id" element={<QuestionDetail />} /> // question detail page
            <Route path="/login" element={<Login />} /> // login page
            <Route path="/register" element={<Register />} /> // register page
            <Route path="/edit-question/:id" element={<EditQuestion />} />
             <Route path="/HowitWork" element={<HowitWork />} />
            

            <Route path="*" element={<Navigate to="/" replace />} /> // fallback redirect
          </Routes>
          
        </main>
        
        <Footer /> {/* footer */}
      </div>
    </AppState.Provider>
  );
}

export default App;
