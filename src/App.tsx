import { Route, Routes } from "react-router-dom";
import "./App.css";
import AboutUsPage from "./pages/AboutUsPage";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import CreateQuestionSetPage from "./pages/QuestionSet/CreateQuestionSetPage";
import { jwtDecode } from "jwt-decode";
import ListQuestionSetPage from "./pages/QuestionSet/ListQuestionSetPage";
import AttemptQuizPage from "./pages/QuestionSet/AttemptQuizPage";

// Homepages
import UnAuthHomePage from "./components/HomePage/UnAuthHomePage";
import AuthHomePage from "./components/HomePage/AuthHomePage";
import ProfilePage from "./pages/ProfilePage"; // ✅ import ProfilePage

export interface IAuthState {
  isAuth: boolean;
  role: "guest" | "admin" | "professional";
}

export interface IAuthContext extends IAuthState {
  setAuthState: React.Dispatch<React.SetStateAction<IAuthState>>;
}

export interface JWTData {
  id: string;
  role: "admin" | "professional";
}

export const AuthContext = createContext<IAuthContext>({
  isAuth: false,
  role: "guest",
  setAuthState: () => {},
});

function App() {
  const [authState, setAuthState] = useState<IAuthState>({
    isAuth: false,
    role: "guest",
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setIsLoading(false);
      return;
    }

    async function verifyUser() {
      try {
        await axios.get("http://localhost:3000/api/verify/me", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const { role } = jwtDecode<JWTData>(accessToken as string);
        setAuthState({ isAuth: true, role });
      } catch (err) {
        localStorage.removeItem("accessToken");
      } finally {
        setIsLoading(false);
      }
    }

    verifyUser();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <AuthContext.Provider
      value={{
        isAuth: authState.isAuth,
        role: authState.role,
        setAuthState,
      }}
    >
      <Navbar />
      <Routes>
        {/* Conditional Homepage */}
        <Route
          path="/"
          element={authState.isAuth ? <AuthHomePage /> : <UnAuthHomePage />}
        />

        <Route path="/about" element={<AboutUsPage />} />

        {/* Unauth-only routes */}
        {authState.role === "guest" && (
          <>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </>
        )}

        {/* Auth routes */}
        {authState.isAuth && (
          <>
            {/* ✅ Profile route now points to ProfilePage */}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/questionset/list" element={<ListQuestionSetPage />} />
            <Route path="/questionset/:id/attempt" element={<AttemptQuizPage />} />
          </>
        )}

        {/* Admin-only routes */}
        {authState.role === "admin" && (
          <Route path="/admin/questionset/create" element={<CreateQuestionSetPage />} />
        )}

        {/* Fallback */}
        <Route path="*" element={<p>Page Not Found</p>} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
