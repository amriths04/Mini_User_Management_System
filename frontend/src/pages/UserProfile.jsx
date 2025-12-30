import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../css/UserProfile.css";
import Button from "../components/Button";
import Input from "../components/Input";
import { getMe, updateProfile, changePassword } from "../services/userService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const [userInfo, setUserInfo] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const { user, authChecked, refreshUser, logout } = useAuth();
  const navigate = useNavigate();


  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [touched, setTouched] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});

 useEffect(() => {
  if (!user) return;

  if (user) {
    setUserInfo(user);
    setFullName();
    setEmail();
  }
}, [user]);



  const markTouched = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const d = new Date(dateString);
    return isNaN(d.getTime()) ? "-" : d.toLocaleString();
  };

  const handleProfileUpdate = async () => {
    setError("");
    setSuccess("");

    const errors = {};

    if (!fullName.trim()) errors.fullName = "Full name is required";
    if (!email.trim()) errors.email = "Email is required";
    else if (!isValidEmail(email)) errors.email = "Invalid email format";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setTouched({ fullName: true, email: true });
      return;
    }

    try {
      setLoading(true);
      const res = await updateProfile({ fullName, email });
      if (res.user) {
        setUserInfo(res.user);
      }
      await refreshUser();
      setSuccess("Profile updated successfully");
      setFieldErrors({});
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const clearPasswordFields = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handlePasswordChange = async () => {
    setError("");
    setSuccess("");

    if (!currentPassword) return setError("Current password is required");
    if (!newPassword) return setError("New password is required");
    if (newPassword.length < 6)
      return setError("New password must be at least 6 characters");
    if (newPassword !== confirmPassword)
      return setError("Passwords do not match");

    try {
      setLoading(true);
      await changePassword({
        currentPassword,
        newPassword,
      });

      setSuccess("Password updated successfully");
      clearPasswordFields();
    } catch (err) {
      setError(err.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-content">
        <div className="profile-container">
          <h2>User Profile</h2>

          {/* 🔹 User Information */}
          {userInfo && (
            <div className="profile-section">
              <h3>User Information</h3>
              <table className="user-info-table">
                <tbody>
                  <tr>
                    <td>Full Name</td>
                    <td>{userInfo.fullName}</td>
                  </tr>

                  <tr>
                    <td>Email</td>
                    <td>{userInfo.email}</td>
                  </tr>
                  <tr>
                    <td>User ID</td>
                    <td>{userInfo._id}</td>
                  </tr>
                  <tr>
                    <td>Role</td>
                    <td>{userInfo.role}</td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td>
                      <span className={`status-pill ${userInfo.status}`}>
                        {userInfo.status}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          <div className="profile-section">
            <h3>Update Profile</h3>

            <Input
              label="Full Name"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                setFieldErrors((p) => ({ ...p, fullName: "" }));
              }}
              onBlur={() => markTouched("fullName")}
              touched={touched.fullName}
              error={fieldErrors.fullName}
            />

            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setFieldErrors((p) => ({ ...p, email: "" }));
              }}
              onBlur={() => markTouched("email")}
              touched={touched.email}
              error={fieldErrors.email}
            />

            <div className="actions">
              <Button
                variant="primary"
                loading={loading}
                onClick={handleProfileUpdate}
              >
                Save
              </Button>

              <Button
                variant="secondary"
                onClick={() => {
                  setFullName("");
                  setEmail("");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
          {error && <p className="error-text">{error}</p>}
          {success && <p className="success-text">{success}</p>}
          <div className="profile-section">
            <h3>Change Password</h3>

            <Input
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />

            <Input
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <Input
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="actions">
              <Button
                variant="primary"
                loading={loading}
                onClick={handlePasswordChange}
              >
                Update Password
              </Button>
              <Button variant="secondary" onClick={clearPasswordFields}>
                Clear
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
