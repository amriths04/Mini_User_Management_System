const API_URL = import.meta.env.VITE_API_URL;

export const getMe = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
};


export const updateProfile = async (data) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/users/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result;
};


export const changePassword = async (data) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/users/change-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result;
};