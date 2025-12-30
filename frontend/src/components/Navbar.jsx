import { useNavigate, useLocation } from "react-router-dom";
import "../css/Navbar.css";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  if (!user) return null;

  const currentPath = location.pathname;

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="brand">Mini User Management</span>
      </div>

      <div className="navbar-right">
        <span className="user-info">
          {user.fullName} ({user.role})
        </span>
        {user.role === "admin" && currentPath !== "/admin" && (
          <Button
            variant="secondary"
            onClick={() => navigate("/admin")}
          >
            Admin Dashboard
          </Button>
        )}

        {currentPath !== "/profile" && (
          <Button
            variant="primary"
            onClick={() => navigate("/profile")}
          >
            Profile
          </Button>
        )}

        <Button variant="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </nav>
  );
}
