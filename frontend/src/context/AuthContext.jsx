import { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "../lib/axiosClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    const res = await axiosClient.post("/auth/login", credentials);
    setUser(res.data.user);
    localStorage.setItem("token", res.data.token);
    axiosClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${res.data.token}`;
  };

  const register = async (credentials) => {
    return axiosClient.post("/auth/register", credentials);
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("token");
    delete axiosClient.defaults.headers.common["Authorization"];
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }
        axiosClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
        const res = await axiosClient.get("/auth/me");
        setUser(res.data);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
