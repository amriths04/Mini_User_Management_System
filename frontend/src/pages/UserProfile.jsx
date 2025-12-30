import { useState } from "react";
import Navbar from "../components/Navbar";
import "../css/UserProfile.css";
import Button from "../components/Button";

export default function UserProfile() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [fullName, setFullName] = useState(storedUser.fullName);
  const [email, setEmail] = useState(storedUser.email);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleProfileUpdate = async () => {
    setError("");
    setSuccess("");

    if (!fullName.trim()) {
      setError("Full name is required");
      return;
    }

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Invalid email format");
      return;
    }

    try {
      setLoading(true);

      const updatedUser = { ...storedUser, fullName, email };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setSuccess("Profile updated successfully");
    } catch (err) {
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Change password
  const handlePasswordChange = async () => {
    setError("");
    setSuccess("");

    if (!currentPassword) {
      setError("Current password is required");
      return;
    }

    if (!newPassword) {
      setError("New password is required");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      setSuccess("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="profile-container">
        <h2>User Profile</h2>

        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}

        {/* Profile Info */}
        <div className="profile-section">
          <h3>Profile Information</h3>

          <label>Full Name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />

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
                setFullName(storedUser.fullName);
                setEmail(storedUser.email);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>

        {/* Change Password */}
        <div className="profile-section">
          <h3>Change Password</h3>

          <input
            type="password"
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button
            variant="primary"
            loading={loading}
            onClick={handlePasswordChange}
          >
            Update Password
          </Button>
        </div>
      </div>
    </>
  );
}
