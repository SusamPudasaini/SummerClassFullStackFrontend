import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext, type IAuthContext } from "../App";
import "../css/ProfilePage.css";

interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
}

function ProfilePage() {
  const { isAuth } = useContext<IAuthContext>(AuthContext);
  const [user, setUser] = useState<IUser | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const accessToken = localStorage.getItem("accessToken");
  const BASE_URL = "http://localhost:3000/api/users"; // Adjust if your Express uses /api

  // Fetch profile
  useEffect(() => {
    if (!isAuth || !accessToken) return;

    setLoading(true);
    axios
      .get(`${BASE_URL}/profile/me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        // Ensure you extract `user` correctly
        const data = res.data.user ?? res.data;
        setUser(data);
        setName(data.name);
        setEmail(data.email);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [isAuth, accessToken]);

  // Update profile
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!accessToken) return;

    setMessage("");
    axios
      .put(
        `${BASE_URL}/profile`,
        { name, email },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      .then((res) => {
        const updatedUser = res.data.user ?? res.data;
        setUser(updatedUser);
        setMessage("Profile updated successfully!");
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        setMessage("Error updating profile. Please try again.");
      });
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!user) return <p>No profile data found.</p>;

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label>Role:</label>
          <input type="text" value={user.role} disabled />
        </div>

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default ProfilePage;
