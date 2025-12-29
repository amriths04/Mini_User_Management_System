import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      return setError("All fields are required");
    }

    const result = await loginUser(email, password);

    if (result.error) {
      setError(result.error);
    } else {
      localStorage.setItem("token", result.token);
      navigate("/profile");
    }
  };

  return (
  <div className="login-page">
    <div className="login-container">
      <h2>Login</h2>

      {error && <div className="login-error">{error}</div>}

      <form className="login-form" onSubmit={submitHandler}>
        <input
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

        <button type="submit">Login</button>
      </form>

      <div className="login-footer">
        Don’t have an account? <Link to="/signup">Signup</Link>
      </div>
    </div>
  </div>
);
};


export default Login;
