import Navbar from "../components/Navbar";
import "../css/AdminDashboard.css";

export default function AdminDashboard() {
  return (
    <>
      <Navbar />

      <div className="admin-container">
        <h2>Admin Dashboard</h2>

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
              {/* Dummy row – will be replaced by API data */}
              <tr>
                <td>test@gmail.com</td>
                <td>Test User</td>
                <td>user</td>
                <td>active</td>
                <td>
                  <button className="danger-btn">Deactivate</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination placeholder */}
        <div className="pagination">
          <button>{"<"}</button>
          <span>1</span>
          <button>{">"}</button>
        </div>
      </div>
    </>
  );
}
