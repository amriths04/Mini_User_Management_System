import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import "../css/AdminDashboard.css";
import Modal from "../components/Modal";
import {
  getAllUsers,
  activateUser,
  deactivateUser,
} from "../services/adminService";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getAllUsers(page);
        setUsers(res.data);
        setTotalPages(res.pagination.totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

  return (
    <>
      <Navbar />
      <div className="page-content">
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
                    <tr key={user._id}>
                      <td>{user.email}</td>
                      <td>{user.fullName}</td>
                      <td>{user.role}</td>
                      <td>{user.status}</td>
                      <td>
                        {user.status === "active" ? (
                          <Button
                            variant="danger"
                            disabled={loading}
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
                            disabled={loading}
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

          <div className="pagination">
            <Button
              variant="secondary"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </Button>

            <span>
              Page {page} of {totalPages}
            </span>

            <Button
              variant="secondary"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
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
          onConfirm={async () => {
            try {
              setLoading(true);

              if (selectedUser.status === "active") {
                await deactivateUser(selectedUser._id);
              } else {
                await activateUser(selectedUser._id);
              }

              // ✅ Update UI instantly
              setUsers((prev) =>
                prev.map((u) =>
                  u._id === selectedUser._id
                    ? {
                        ...u,
                        status:
                          selectedUser.status === "active"
                            ? "inactive"
                            : "active",
                      }
                    : u
                )
              );

              setIsModalOpen(false);
              setSelectedUser(null);
            } catch (err) {
              setError(err.message);
            } finally {
              setLoading(false);
            }
          }}
        />
      </div>
    </>
  );
}
