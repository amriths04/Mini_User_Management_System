import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import "../css/Login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!isValidEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        // Required field check
        if (!email || !password) {
            setError("Email and password are required");
            return;
        }

        try {
            setLoading(true);

            const data = await loginUser(email, password);

            // Redirect logic-rolebased
            if (data.user.role === "admin") {
                navigate("/admin", { replace: true });
            } else {
                navigate("/profile", { replace: true });
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>

            {error && <p className="error-text">{error}</p>}

            <form onSubmit={handleLogin}>
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

                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            <p>
                Don’t have an account? <Link to="/signup">Signup</Link>
            </p>
        </div>
    );
}
