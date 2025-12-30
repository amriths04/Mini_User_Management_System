import { useState,useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "../services/authService";
import "../css/Signup.css";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (token && user) {
    const parsedUser = JSON.parse(user);

    if (parsedUser.role === "admin") {
      navigate("/admin", { replace: true });
    } else {
      navigate("/profile", { replace: true });
    }
    }
    }, [navigate]);

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isStrongPassword = (password) =>
    password.length >= 6;

const handleSignup = async (e) => {
  e.preventDefault();
  setError("");

  if (!fullName.trim()) {
    setError("Full name is required");
    return;
  }

  if (!email.trim()) {
    setError("Email is required");
    return;
  }

  if (!isValidEmail(email)) {
    setError("Please enter a valid email address");
    return;
  }

  if (!password) {
    setError("Password is required");
    return;
  }

  if (!isStrongPassword(password)) {
    setError("Password must be at least 6 characters long");
    return;
  }

  if (!confirmPassword) {
    setError("Please confirm your password");
    return;
  }

  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  try {
    setLoading(true);
    await signupUser(fullName, email, password);

    navigate("/login", { replace: true });
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="signup-container">
      <h2>Create Account</h2>

      {error && <p className="error-text">{error}</p>}

      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Signup"}
        </button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
