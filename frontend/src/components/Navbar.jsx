import { useNavigate } from "react-router-dom";
import "../css/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="brand">Mini User Management</span>
      </div>

      <div className="navbar-center">
        {user.role === "admin" && (
          <button onClick={() => navigate("/admin")}>
            Admin Dashboard
          </button>
        )}
        <button onClick={() => navigate("/profile")}>
          Profile
        </button>
      </div>

      <div className="navbar-right">
        <span className="user-info">
          {user.fullName} ({user.role})
        </span>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
