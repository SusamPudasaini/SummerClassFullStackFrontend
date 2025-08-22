import { NavLink } from "react-router-dom";
import { AuthContext, type IAuthContext } from "../App";
import { useContext } from "react";
import "../css/Navbar.css";

function Navbar() {
  const { isAuth, role } = useContext<IAuthContext>(AuthContext);

  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    window.location.reload();
  };

  return (
    <div className="navbar">
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About Us</NavLink>

        {isAuth ? (
          <>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/questionset/list">QuestionSets</NavLink>

            {/* ✅ Admin-only link */}
            {role === "admin" && (
              <NavLink to="/admin/questionset/create">Add Question Set</NavLink>
            )}

            <button onClick={logoutHandler}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
          </>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
