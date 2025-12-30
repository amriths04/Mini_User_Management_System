const API_URL = import.meta.env.VITE_API_URL;

export const getAllUsers = async (page = 1) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/admin/users?page=${page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch users");
  }

  return data;
};


export const activateUser = async (userId) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${API_URL}/admin/users/${userId}/activate`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};


export const deactivateUser = async (userId) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${API_URL}/admin/users/${userId}/deactivate`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};