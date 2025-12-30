import { useState } from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import "../css/AdminDashboard.css";
import Modal from "../components/Modal";

export default function AdminDashboard() {
  const [users, setUsers] = useState([
    {
      id: 1,
      email: "test@gmail.com",
      fullName: "Test User",
      role: "user",
      status: "active",
    },
    {
      id: 2,
      email: "admin@gmail.com",
      fullName: "Admin User",
      role: "admin",
      status: "inactive",
    },
  ]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <>
      <Navbar />

      <div className="admin-container">
        <h2>Admin Dashboard</h2>

        {error && <p className="error-text">{error}</p>}

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Full Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="center-text">
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="center-text">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.email}</td>
                    <td>{user.fullName}</td>
                    <td>{user.role}</td>
                    <td>{user.status}</td>
                    <td>
                      {user.status === "active" ? (
                        <Button
                          variant="danger"
                          onClick={() => {
                            setSelectedUser(user);
                            setIsModalOpen(true);
                          }}
                        >
                          Deactivate
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          onClick={() => {
                            setSelectedUser(user);
                            setIsModalOpen(true);
                          }}
                        >
                          Activate
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination UI */}
        <div className="pagination">
          <Button variant="secondary">Prev</Button>
          <span>Page 1</span>
          <Button variant="secondary">Next</Button>
        </div>
      </div>
            <Modal
        isOpen={isModalOpen}
        title="Confirm Action"
        message={
          selectedUser?.status === "active"
            ? "Are you sure you want to deactivate this user?"
            : "Are you sure you want to activate this user?"
        }
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
        }}
        onConfirm={() => {
          // 🔧 Backend API call will go here later
          setIsModalOpen(false);
          setSelectedUser(null);
        }}
      />
    </>
  );
}
