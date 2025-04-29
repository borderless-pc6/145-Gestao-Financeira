import { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebaseconfig";
import HomePage from "./Components/HomePage/HomePage";
import "./App.css";
import { FirebaseError } from "firebase/app";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      console.log("User signed in:", userCredential.user);
      setIsLoggedIn(true);
    } catch (err: unknown) {
      console.error("Login error:", err);

      // Properly type the error
      if (err instanceof FirebaseError) {
        setError(err.message || "Login failed. Please check your credentials.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      setUsername("");
      setPassword("");
    } catch (err: unknown) {
      console.error("Logout error:", err);
      // Handle logout error if needed
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (isLoggedIn) {
    return <HomePage username={username} onLogout={handleLogout} onNavigate={function (path: string): void {
      throw new Error("Function not implemented.");
    }} />;
  }

  return (
    <div className="login-container">
      <div className="welcome-section">
        <div className="welcome-content">
          <h1 className="welcome-title">
            Bem-vindo!
          </h1>
          <p className="welcome-subtitle">Aqui você controla melhor a vida financeira do seu negócio!</p>

          <div className="dashboard-image-container">
            <img
              src="./dashboard"
              alt="imagem logo"
              className="dashboard-image"
            />
          </div>
        </div>
      </div>

      <div className="login-section">
        <div className="login-content">
          <h2 className="login-title">Acesse sua conta</h2>

          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="error-message">{error}</div>}
            <div className="form-group-form">
              <div className="input-container">
                <span className="input-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <input
                  type="email"
                  placeholder="Digite o e-mail"
                  className="form-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group-form">
              <div className="input-container">
                <span className="input-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite a senha"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="form-group-form checkbox-group">
              <label className="checkbox-container">
                <input type="checkbox" />
                <span className="checkbox-text">Salvar e-mail para o próximo login</span>
              </label>
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? (
                "Carregando..."
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                  Entrar
                </>
              )}
            </button>
          </form>

          <div className="signup-prompt">
            <p>
              Ainda não é cliente?{" "}
            </p>
          </div>

          <div className="footer">
            <p>BORDERLESS 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}