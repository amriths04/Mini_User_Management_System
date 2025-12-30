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
