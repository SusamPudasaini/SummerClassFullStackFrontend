import { NavLink } from "react-router-dom";
import "../../css/AuthHomePage.css";

function AuthHomePage() {
  return (
    <div className="auth-container">
      <h1>Welcome to QuizApp 🎉</h1>
      <p>Ready to test your knowledge? Start your quiz journey below!</p>

      <div className="dashboard-actions">
        <NavLink to="/questionset/list" className="btn btn-quiz">
          Take a Quiz
        </NavLink>
        <NavLink to="/profile" className="btn btn-profile">
          View / Edit Profile
        </NavLink>
      </div>

      <section className="dashboard-info">
        <h2>How it works:</h2>
        <ol>
          <li>Click "Take a Quiz" to see all available question sets.</li>
          <li>Select a quiz that interests you and attempt it.</li>
          <li>Review your results and improve your skills!</li>
        </ol>
      </section>
    </div>
  );
}

export default AuthHomePage;
