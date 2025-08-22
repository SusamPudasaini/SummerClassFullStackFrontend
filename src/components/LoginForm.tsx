import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext, type IAuthContext } from "../App";
import "../css/loginform.css";   

function LoginForm() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { setAuthState } = useContext<IAuthContext>(AuthContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const finalData = { email, password };

    axios
      .post("http://localhost:3000/users/login", finalData)
      .then((response) => {
        const token = response.data.accessToken;
        localStorage.setItem("accessToken", token);
        setAuthState((prev) => ({
          ...prev,
          isAuth: true,
        })); // mark user as authenticated
        window.location.href = "/";
      })
      .catch((error) => {
        const errors = error?.response?.data?.message || "An error occurred";
        alert(errors);
      });
  };

  return (
    <div className="login-container">
      <h1>Login Form</h1>
      <p>Login to Continue</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
