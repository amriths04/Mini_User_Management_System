import { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "../services/userService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  const refreshUser = async () => {
    try {
      const me = await getMe();
      setUser(me);
    } catch {
        if (err?.name === "AbortError") return;
        localStorage.removeItem("token");
      setUser(null);
    }finally{
        setAuthChecked(true);
    }
  };

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    refreshUser();
  } else {
    setUser(null);
    setAuthChecked(true);
  }
}, []);


  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, authChecked, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
