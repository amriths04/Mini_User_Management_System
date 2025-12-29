const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  return data;
};
