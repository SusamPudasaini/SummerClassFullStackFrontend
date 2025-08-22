import "../css/AboutUsPage.css";

function AboutUsPage() {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About QuizApp 🎓</h1>
        <p>
          Welcome to QuizApp – the easiest way to create, share, and attempt quizzes online!
        </p>
      </header>

      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to make learning fun, interactive, and accessible to everyone.
          Whether you're a student, teacher, or professional, QuizApp helps you test
          knowledge and improve skills effortlessly.
        </p>
      </section>

      <section className="about-section">
        <h2>Key Features</h2>
        <ul>
          <li>Create and manage your own quizzes easily.</li>
          <li>Attempt quizzes created by others.</li>
          <li>Track your scores and progress over time.</li>
          <li>Interactive and user-friendly interface.</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Meet Our Team</h2>
        <p>
          QuizApp is developed by Susam Pudasaini for his summer enrichment class project with the guidance of Bishal Kharel
        </p>
      </section>

      <footer className="about-footer">
        <p>&copy; {new Date().getFullYear()} QuizApp. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AboutUsPage;
