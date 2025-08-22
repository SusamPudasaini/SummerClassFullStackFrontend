import { NavLink } from "react-router-dom";
import "../../css/unAuthHomepage.css";


function UnAuthHomePage() {
  return (
    <div className="unauth-container">
      <h1>Welcome to QuizApp 🎉</h1>
      <p>Please login or create an account to continue.</p>
      <div className="unauth-actions">
        <NavLink to="/login" className="btn btn-login">
          Login
        </NavLink>
        <NavLink to="/register" className="btn btn-register">
          Register
        </NavLink>
      </div>
    </div>
  );
}

export default UnAuthHomePage;
